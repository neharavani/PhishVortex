// /app/api/generate-phishing/route.js
import { NextResponse } from "next/server";

// Config for inference API
const API_URL = process.env.INFERENCE_API_URL || "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

export async function POST(req) {
  try {
    const { count = 10 } = await req.json();
    
    // Generate emails in smaller batches to avoid token limits
    const batchSize = 2; // Generate 2 emails at a time
    const emails = [];
    const totalBatches = Math.ceil(count / batchSize);
    
    for (let batch = 0; batch < totalBatches; batch++) {
      // Calculate how many emails to generate in this batch
      const batchCount = Math.min(batchSize, count - (batch * batchSize));
      
      if (batchCount <= 0) break;
      
      try {
        const batchEmails = await generateEmailBatch(batchCount);
        if (batchEmails && batchEmails.length > 0) {
          emails.push(...batchEmails);
        }
      } catch (error) {
        console.error(`Error generating batch ${batch + 1}:`, error);
        // Continue to next batch if one fails
      }
      
      // Add a slight delay between requests to avoid rate limiting
      if (batch < totalBatches - 1) {
        await new Promise(resolve => setTimeout(resolve, 600));
      }
    }
    
    // If we couldn't generate enough emails, fill the rest with fallbacks
    if (emails.length < count) {
      const neededFallbacks = count - emails.length;
      console.log(`⚠️ Adding ${neededFallbacks} fallback emails to reach requested count`);
      
      const templates = [
        {
          sender: "security@yourbank.com",
          recipient: "user@example.com",
          subject: "Urgent: Your Account Has Been Limited",
          body: "Dear Valued Customer,\n\nWe have detected unusual activity in your account. Please click here to verify your information: http://secure-banking-verify.com\n\nFailure to verify will result in account suspension.\n\nYour Bank Security Team",
          isPhishing: true,
          explanation: "This is a phishing email. It creates false urgency, uses a suspicious link domain, and asks for immediate action without specific details."
        },
        {
          sender: "support@microsoft.com",
          recipient: "user@example.com",
          subject: "Your Microsoft Subscription Receipt",
          body: "Hello,\n\nThank you for your recent subscription renewal. Here is your receipt for Microsoft 365 ($99.99).\n\nOrder number: MS-7829456\nDate: April 15, 2025\n\nView your receipt online at: https://www.microsoft.com/account/orders\n\nRegards,\nMicrosoft Billing Team",
          isPhishing: false,
          explanation: "This is legitimate. It comes from an official Microsoft domain, includes specific order details, and links to the official Microsoft website. It doesn't request personal information or create false urgency."
        }
      ];
      
      const fallbacks = generateFallbackEmails(templates, neededFallbacks);
      emails.push(...fallbacks);
    }
    
    console.log(`✅ Successfully generated ${emails.length} email(s)`);
    return NextResponse.json({ success: true, emails });
    
  } catch (err) {
    console.error("🔥 Server Error:", err.message || err);
    return NextResponse.json(
      { success: false, error: "Server error occurred. Check console for details." },
      { status: 500 }
    );
  }
}

// Function to generate a batch of emails
async function generateEmailBatch(batchCount) {
  const phishingCount = Math.ceil(batchCount / 2); // About half should be phishing
  const legitimateCount = batchCount - phishingCount;
  
  const prompt = `Generate ${batchCount} different email examples with ${phishingCount} phishing emails and ${legitimateCount} legitimate emails.

For each email, include:
- "sender": the email address
- "recipient": "user@example.com"
- "subject": the email subject
- "body": the email content
- "isPhishing": boolean (true/false) indicating if it's a phishing email
- "explanation": why it is or isn't a phishing email

Format the output as a JSON array.

For phishing emails, include common tactics like urgent language, suspicious links, requests for personal information, etc. For legitimate emails, make them realistic but without suspicious elements.

ONLY return the JSON array with no additional text.`;

  const payload = {
    inputs: prompt,
    parameters: {
      max_new_tokens: 1500,
      temperature: 0.7,
      top_p: 0.95,
      return_full_text: false
    }
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ API Error (${response.status}):`, errorText);
    return null;
  }

  const data = await response.json();
  const generatedText = data?.[0]?.generated_text || data?.generated_text || "";
  
  if (!generatedText) {
    console.error("⚠️ Empty response from API");
    return null;
  }

  try {
    // Find JSON array in the response
    const jsonStart = generatedText.indexOf('[');
    const jsonEnd = generatedText.lastIndexOf(']') + 1;
    
    if (jsonStart === -1 || jsonEnd <= jsonStart) {
      // Try individual objects if array not found
      return extractIndividualEmails(generatedText);
    }
    
    const jsonStr = generatedText.substring(jsonStart, jsonEnd);
    const batchEmails = JSON.parse(jsonStr);
    
    if (!Array.isArray(batchEmails) || batchEmails.length === 0) {
      throw new Error("No valid email array found");
    }
    
    // Validate and format emails
    const validEmails = batchEmails.filter(email => 
      email.sender && email.recipient && email.subject && 
      email.body && typeof email.isPhishing === 'boolean' && email.explanation
    );
    
    // Format body text (ensure proper line breaks)
    validEmails.forEach(email => {
      if (email.body) {
        email.body = email.body.replace(/\\n/g, '\n');
      }
    });
    
    return validEmails;
  } catch (error) {
    console.error("🛑 Error parsing email JSON:", error.message);
    return extractIndividualEmails(generatedText);
  }
}

// Try to extract individual email objects if array parsing fails
function extractIndividualEmails(text) {
  const jsonRegex = /\{[\s\S]*?"sender"[\s\S]*?"recipient"[\s\S]*?"subject"[\s\S]*?"body"[\s\S]*?"isPhishing"[\s\S]*?"explanation"[\s\S]*?\}/g;
  const matches = text.match(jsonRegex);

  if (!matches || matches.length === 0) {
    console.error("🛑 No email objects found in response text");
    return null;
  }

  // Parse each match into an email object
  const emails = [];
  for (const match of matches) {
    try {
      const email = JSON.parse(match);
      // Format line breaks
      if (email.body) {
        email.body = email.body.replace(/\\n/g, '\n');
      }
      emails.push(email);
    } catch (error) {
      console.warn("⚠️ Skipping invalid JSON object");
    }
  }

  console.log(`✅ Extracted ${emails.length} individual email(s) via regex`);
  return emails;
}

// Helper function to generate fallback emails if the API fails
function generateFallbackEmails(templates, count) {
  const emails = [...templates];
  const companies = ["Amazon", "Netflix", "PayPal", "Apple", "Google", "Facebook", "Twitter", "Bank of America", "Chase", "Dropbox"];
  const domains = ["secure-verify.com", "account-access.net", "customer-verify.org", "security-check.co"];
  
  while (emails.length < count) {
    const isPhish = emails.length % 2 === 0; // Alternate between phishing and legitimate
    const company = companies[Math.floor(Math.random() * companies.length)];
    
    if (isPhish) {
      const fakeDomain = domains[Math.floor(Math.random() * domains.length)];
      emails.push({
        sender: `security@${company.toLowerCase().replace(' ', '')}-account.com`,
        recipient: "user@example.com",
        subject: `Urgent: Your ${company} Account Needs Verification`,
        body: `Dear Customer,\n\nWe have detected suspicious login attempts on your ${company} account. To secure your account, please verify your information immediately: http://${company.toLowerCase()}-${fakeDomain}/secure\n\nThis link will expire in 24 hours.\n\nSecurity Team`,
        isPhishing: true,
        explanation: `This is a phishing email. The sender domain "${company.toLowerCase().replace(' ', '')}-account.com" is not official, the link is suspicious, and it creates false urgency without specific details about the alleged security issue.`
      });
    } else {
      emails.push({
        sender: `no-reply@${company.toLowerCase().replace(' ', '')}.com`,
        recipient: "user@example.com",
        subject: `Your ${company} Receipt`,
        body: `Hello,\n\nThank you for your recent purchase from ${company}.\n\nOrder #: ${Math.floor(Math.random() * 1000000)}\nDate: April ${Math.floor(Math.random() * 15) + 1}, 2025\nAmount: $${(Math.random() * 100).toFixed(2)}\n\nYou can view your receipt in your account.\n\nThank you for choosing ${company}!`,
        isPhishing: false,
        explanation: `This is a legitimate email from ${company}. It comes from their official domain, includes specific transaction details, doesn't ask for sensitive information, and doesn't create false urgency.`
      });
    }
  }
  
  return emails;
}