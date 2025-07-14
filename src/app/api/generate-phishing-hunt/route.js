// /app/api/generate-phishing-hunt/route.js
import { NextResponse } from "next/server";

// Config for inference API
const API_URL = process.env.INFERENCE_API_URL || "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

export async function POST(req) {
  try {
    const { count = 5 } = await req.json();
    
    // Use a smaller, more efficient model like Zephyr-7B
    // Instead of generating the full JSON structure at once, we'll generate one email at a time
    // This helps with token limits and response formatting
    
    const emails = [];
    const emailTypes = [
      "bank security alert",
      "online shopping order confirmation",
      "cloud storage account notification",
      "social media security update",
      "streaming service payment issue"
    ];
    
    // Determine how many emails to generate (use the requested count, but cap at 5 for efficiency)
    const numToGenerate = Math.min(count, 5);
    
    // Generate emails one at a time
    for (let i = 0; i < numToGenerate; i++) {
      // Pick an email type for variety
      const emailType = emailTypes[i % emailTypes.length];
      
      try {
        const generatedEmail = await generateSinglePhishingEmail(emailType);
        if (generatedEmail) {
          emails.push(generatedEmail);
        }
      } catch (error) {
        console.error(`Error generating email ${i+1}:`, error);
        // Continue to next email if one fails
      }
      
      // Add a slight delay between requests to avoid rate limiting
      if (i < numToGenerate - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    // If we couldn't generate any emails, fall back to predefined ones
    if (emails.length === 0) {
      console.log("⚠️ Falling back to predefined phishing emails");
      return NextResponse.json({ 
        success: true, 
        emails: generateFallbackEmails(count) 
      });
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

// Function to generate a single phishing email using inference API
async function generateSinglePhishingEmail(emailType) {
  const prompt = `Generate a realistic phishing email for a "${emailType}" scenario. Format it as a JSON object with these fields:
- sender: The email address of the sender (make it suspicious but believable)
- recipient: "user@example.com"
- subject: A compelling subject line that might trick users
- body: The full email content with appropriate formatting
- phishingClues: An array of 3-5 objects, each with:
  * text: The suspicious text or element in the email
  * explanation: Why this element indicates phishing
  * hint: A hint to help users identify this clue

The email should look somewhat legitimate but contain clear phishing indicators.
ONLY return the JSON object without any additional text or explanation.`;

  const payload = {
    inputs: prompt,
    parameters: {
      max_new_tokens: 800,
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
    // Find JSON object in the response
    const jsonStart = generatedText.indexOf('{');
    const jsonEnd = generatedText.lastIndexOf('}') + 1;
    
    if (jsonStart === -1 || jsonEnd <= jsonStart) {
      throw new Error("No valid JSON found in response");
    }
    
    const jsonStr = generatedText.substring(jsonStart, jsonEnd);
    const email = JSON.parse(jsonStr);
    
    // Validate required fields
    if (!email.sender || !email.recipient || !email.subject || !email.body || 
        !Array.isArray(email.phishingClues) || email.phishingClues.length === 0) {
      throw new Error("Email missing required fields");
    }
    
    // Format body text (ensure proper line breaks)
    email.body = email.body.replace(/\\n/g, '\n');
    
    return email;
  } catch (error) {
    console.error("🛑 Error parsing email JSON:", error.message);
    return null;
  }
}

// Generate fallback emails with phishing clues if the API fails
function generateFallbackEmails(count) {
  const fallbackEmails = [
    {
      sender: "amazon-order@amaz0n-verify.net",
      recipient: "user@example.com",
      subject: "Your Amazon Order #A45B892 - Action Required",
      body: "Dear Valued Customer,\n\nWe've noticed an issue processing your recent Amazon order #A45B892. Please verify your payment information within 24 hours to avoid order cancellation.\n\nClick here to update your payment details: http://amazon-account-verify.net/secure\n\nIf you don't update your information, your Amazon Prime membership will also be suspended.\n\nFor questions, contact our customer service at support@amaz0n-verify.net or call 1-888-555-0123.\n\nAmazon Customer Support Team",
      phishingClues: [
        {
          text: "amazon-order@amaz0n-verify.net",
          explanation: "Suspicious sender email with misspelled domain (zero instead of 'o') and non-official domain",
          hint: "Check the sender's email address carefully"
        },
        {
          text: "http://amazon-account-verify.net/secure",
          explanation: "Fake URL that doesn't use Amazon's official domain (amazon.com)",
          hint: "Legitimate Amazon URLs always contain amazon.com"
        },
        {
          text: "support@amaz0n-verify.net",
          explanation: "Contact email with misspelled domain (zero instead of 'o')",
          hint: "Look at the contact information carefully"
        },
        {
          text: "1-888-555-0123",
          explanation: "Fake phone number that doesn't match Amazon's real customer service number",
          hint: "This phone number follows a pattern often used in examples"
        }
      ]
    },
    {
      sender: "security@paypaI-secure.com",
      recipient: "user@example.com",
      subject: "PayPal: Unusual Activity Detected - Immediate Action Required",
      body: "Dear PayPal User,\n\nWe have detected unusual activity on your PayPal account. Your account has been temporarily limited until we can verify your identity.\n\nTo restore full access to your account, please verify your information here:\nhttps://paypaI-secure.com/verify/account\n\nFailure to verify your account within 12 hours will result in permanent account suspension.\n\nPayPal Security Department\nCopyright © 2025 PayPaI Inc. All rights reserved.",
      phishingClues: [
        {
          text: "security@paypaI-secure.com",
          explanation: "The domain uses a capital 'I' instead of lowercase 'l' in 'PayPal' to appear legitimate",
          hint: "Look closely at the spelling of 'PayPal' in the email address"
        },
        {
          text: "https://paypaI-secure.com/verify/account",
          explanation: "The URL uses a capital 'I' instead of lowercase 'l' in 'PayPal' and isn't the official PayPal domain",
          hint: "Real PayPal links always go to paypal.com domains"
        },
        {
          text: "Failure to verify your account within 12 hours will result in permanent account suspension",
          explanation: "Creating extreme urgency with threats of permanent suspension is a common phishing tactic",
          hint: "PayPal doesn't typically give such short deadlines or make such severe threats"
        },
        {
          text: "PayPaI Inc.",
          explanation: "Company name uses a capital 'I' instead of lowercase 'l' in 'PayPal'",
          hint: "Check the company name in the copyright notice"
        }
      ]
    },
    {
      sender: "microsoft365@outlook-verification.com",
      recipient: "user@example.com",
      subject: "Microsoft 365: Your account will be suspended",
      body: "ATTENTION: Your Microsoft 365 account has been flagged for suspicious activity.\n\nDear User,\n\nYour Microsoft 365 subscription will expire in 24 hours. Renew now to avoid data loss and account suspension.\n\nClick here to renew: https://microsoft365-renew.com/account\n\nYou will be charged $49.99 for another year of service. Avoid interruption by renewing immediately.\n\nIf you have questions, reply to this email or call our support team at +1 (255) 345-6789.\n\nMicrosoft Outlook Team\nJhon Williams\nSenior Account Manager",
      phishingClues: [
        {
          text: "microsoft365@outlook-verification.com",
          explanation: "Suspicious sender domain - Microsoft wouldn't use 'outlook-verification.com'",
          hint: "Microsoft would use microsoft.com or office.com domains"
        },
        {
          text: "https://microsoft365-renew.com/account",
          explanation: "Fake URL that doesn't use Microsoft's official domains",
          hint: "Microsoft subscription links would go to microsoft.com or office.com"
        },
        {
          text: "Jhon Williams",
          explanation: "Misspelled name ('Jhon' instead of 'John') indicates poor attention to detail",
          hint: "Look for spelling errors in the signature"
        },
        {
          text: "+1 (255) 345-6789",
          explanation: "Fake phone number with area code 255 (not a valid US area code for Microsoft support)",
          hint: "Check if the phone number looks legitimate"
        },
        {
          text: "ATTENTION: Your Microsoft 365 account has been flagged for suspicious activity.",
          explanation: "Starts with attention-grabbing headline to create alarm",
          hint: "Professional companies rarely start emails with all-caps warnings"
        }
      ]
    },
    {
      sender: "applesupport@icloud-verification.org",
      recipient: "user@example.com",
      subject: "⚠️ Your Apple ID has been locked ⚠️",
      body: "Dear Apple Customer,\n\nYour Apple ID has been locked due to too many failed login attempts.\n\nTo unlock your account and avoid permanent suspension, please verify your information by clicking on the link below:\n\nSECURE LINK: https://apple-id-unlock.org/verify\n\nOnce verified, you will regain access to all Apple services. Failure to verify within 48 hours will result in permanent account deletion.\n\nApple Support Team\nOne Apple Park Way\nCalifornia, USA\n\nThis is an automated message, please do not reply.",
      phishingClues: [
        {
          text: "applesupport@icloud-verification.org",
          explanation: "Suspicious sender domain - Apple wouldn't use 'icloud-verification.org'",
          hint: "Apple uses apple.com or icloud.com for official communications"
        },
        {
          text: "⚠️ Your Apple ID has been locked ⚠️",
          explanation: "Warning emojis in the subject line are unprofessional and designed to create alarm",
          hint: "Apple doesn't use warning emojis in official email subjects"
        },
        {
          text: "https://apple-id-unlock.org/verify",
          explanation: "Fake URL that doesn't use Apple's official domain",
          hint: "Apple account verification would only happen on apple.com domains"
        },
        {
          text: "permanent account deletion",
          explanation: "Threatening permanent deletion is a scare tactic that Apple wouldn't use",
          hint: "Apple wouldn't threaten to delete your account"
        },
        {
          text: "SECURE LINK:",
          explanation: "Labeling a link as 'SECURE LINK' in all caps is a red flag",
          hint: "Legitimate companies don't need to label their links as 'secure'"
        }
      ]
    },
    {
      sender: "netflixbilling@accounts-netflix.com",
      recipient: "user@example.com",
      subject: "Netflix Payment Declined - Update Your Payment Method",
      body: "Dear Valued Netflix Customer,\n\nWe couldn't process your payment of $14.99 for your Netflix subscription.\n\nTo continue enjoying our service without interruption, please update your payment method by clicking the link below:\n\nhttps://accounts-netflix.com/payment/update\n\nIf you don't update your payment information within 24 hours, your account will be suspended.\n\nFor assistance, contact our customer service department at +1 (123) 456-7890 or support@accounts-netflix.com.\n\nThank you for choosing Netflix!\n\nNetflix Support Team\nLos Gatos California\nCopyright Netflix, Inc 2025",
      phishingClues: [
        {
          text: "netflixbilling@accounts-netflix.com",
          explanation: "Suspicious sender domain - Netflix wouldn't use 'accounts-netflix.com'",
          hint: "Official Netflix emails come from netflix.com domains"
        },
        {
          text: "https://accounts-netflix.com/payment/update",
          explanation: "Fake URL that doesn't use Netflix's official domain",
          hint: "Netflix links would only go to netflix.com"
        },
        {
          text: "support@accounts-netflix.com",
          explanation: "Fake support email address with suspicious domain",
          hint: "Look at the contact email domain"
        },
        {
          text: "Los Gatos California",
          explanation: "Missing comma between city and state in address",
          hint: "Professional companies use proper punctuation in addresses"
        },
        {
          text: "+1 (123) 456-7890",
          explanation: "Fake phone number using a common placeholder pattern",
          hint: "This phone number follows a pattern often used in examples"
        }
      ]
    }
  ];
  
  // Return the requested number of emails
  return fallbackEmails.slice(0, count);
}