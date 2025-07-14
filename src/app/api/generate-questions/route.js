import { NextResponse } from "next/server";
import { connectToDatabase } from '../../../../lib/mongodb';
import { GameScore } from '../../../../lib/models/GameScore';

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

// Helper function to wait
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to make Hugging Face API request with retries
async function fetchFromHuggingFace(payload, retries = MAX_RETRIES) {
  if (!HF_API_KEY) {
    throw new Error("HUGGINGFACE_API_KEY environment variable not set");
  }

  const MODEL = "google/flan-t5-small"; 

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Check for model loading status (503)
      if (response.status === 503) {
        const errorData = await response.json();
        console.log(`⏳ Model loading (attempt ${attempt + 1}/${retries}): ${errorData.error || 'Please wait'}`);
        
        // Wait before retry
        if (attempt < retries - 1) {
          await sleep(RETRY_DELAY);
          continue;
        }
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API responded with status ${response.status}: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`❌ Attempt ${attempt + 1}/${retries} failed:`, error.message);
      
      if (attempt < retries - 1) {
        await sleep(RETRY_DELAY);
      } else {
        throw error; // Rethrow after all retries
      }
    }
  }
}

async function fetchFromOpenAI(prompt, count) {
  return JSON.stringify(getBackupQuestions(topic, count));
}

// Backup questions in case API fails
function getBackupQuestions(topic, count) {
  const defaultQuestions = {
    "cybersecurity": [
      {
        "question": "What is phishing?",
        "options": [
          "A fishing technique used by hackers",
          "A social engineering attack that tricks users into revealing sensitive information",
          "A type of computer virus",
          "A method to enhance password security"
        ],
        "answer": "A social engineering attack that tricks users into revealing sensitive information"
      },
      {
        "question": "What does SSL stand for?",
        "options": [
          "Secure Socket Layer",
          "System Security Level",
          "Safe Server Login",
          "Static Security License"
        ],
        "answer": "Secure Socket Layer"
      },
      {
        "question": "What is a firewall?",
        "options": [
          "A physical barrier preventing fire spread in server rooms",
          "A network security device that monitors incoming and outgoing traffic",
          "Software that removes viruses from a computer",
          "A cooling system for overheated servers"
        ],
        "answer": "A network security device that monitors incoming and outgoing traffic"
      },
      {
        "question": "What is two-factor authentication?",
        "options": [
          "Using two different passwords",
          "Logging in from two different devices",
          "A security process requiring two different authentication methods",
          "Authentication that expires after two hours"
        ],
        "answer": "A security process requiring two different authentication methods"
      },
      {
        "question": "What is a DDoS attack?",
        "options": [
          "Digital Denial of Service - a type of malware",
          "Distributed Denial of Service - overwhelming servers with traffic from multiple sources",
          "Data Deletion on Server - permanently removing server data",
          "Device Driver Operating System - a specialized OS for security"
        ],
        "answer": "Distributed Denial of Service - overwhelming servers with traffic from multiple sources"
      },
      {
        "question": "What is encryption?",
        "options": [
          "Converting data into a code to prevent unauthorized access",
          "Compressing files to save space",
          "Scanning for malware",
          "Creating backups of important data"
        ],
        "answer": "Converting data into a code to prevent unauthorized access"
      },
      {
        "question": "What is a VPN?",
        "options": [
          "Virtual Private Network - creates secure connection over public networks",
          "Virus Protection Node - specialized antivirus software",
          "Visual Processing Network - a type of neural network",
          "Virtual Personal Note - secure digital note taking"
        ],
        "answer": "Virtual Private Network - creates secure connection over public networks"
      }
    ],
    "programming": [
      {
        "question": "What is a variable in programming?",
        "options": [
          "A constant value that never changes",
          "A named storage location for data that can be modified",
          "A function that returns multiple values",
          "A type of loop statement"
        ],
        "answer": "A named storage location for data that can be modified"
      },
      {
        "question": "What does HTML stand for?",
        "options": [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hyper Transfer Machine Learning",
          "Home Tool Markup Language"
        ],
        "answer": "Hyper Text Markup Language"
      }
    ]
  };
  const questions = defaultQuestions[topic.toLowerCase()] || defaultQuestions["cybersecurity"];
  return questions.slice(0, count);
}

export async function POST(req) {
  try {
    await connectToDatabase();
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error(`❌ DB Connection Error: ${err.message}`);
    return NextResponse.json({ success: false, error: "Database connection failed" }, { status: 500 });
  }

  try {
    const { topic = "cybersecurity", count = 5, score = 0, total = 0 } = await req.json();

    // Validate inputs
    if (typeof topic !== 'string' || typeof count !== 'number') {
      return NextResponse.json(
        { success: false, error: "Invalid parameters" },
        { status: 400 }
      );
    }

    console.log(`🚀 Requesting ${count} questions about "${topic}"...`);
    
    let questions = [];
    let apiSource = "";
    
    try {
      // Try Hugging Face first with the smaller model
      const payload = {
        inputs: `Generate ${count} multiple-choice quiz questions about ${topic}. Each question should have a question, 4 options, and the correct answer. Format as JSON.`,
        parameters: {
          max_new_tokens: 1024,
          temperature: 0.7,
          return_full_text: false
        }
      };
      
      const hfData = await fetchFromHuggingFace(payload);
      const text = hfData?.[0]?.generated_text || hfData?.generated_text || "";
      
      try {
        // Try to extract JSON from the response
        const jsonMatch = text.match(/\[[\s\S]*\]/) || text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (Array.isArray(parsed)) {
            questions = parsed;
          } else if (parsed.questions) {
            questions = parsed.questions;
          }
          apiSource = "huggingface";
        }
      } catch (parseErr) {
        console.warn("⚠️ JSON parsing failed from Hugging Face response");
      }
    } catch (hfErr) {
      console.error("❌ Hugging Face API error:", hfErr.message);
    }
    
    // Fallback to backup questions if needed
    if (questions.length === 0) {
      console.log("⚠️ Using backup questions");
      questions = getBackupQuestions(topic, count);
      apiSource = "backup";
    }

    // Ensure we have valid questions with correct structure
    questions = questions
      .filter(q => q.question && Array.isArray(q.options) && q.options.length > 0 && q.answer)
      .slice(0, count);
    
    if (questions.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: "Failed to generate valid questions" 
      }, { status: 500 });
    }

    // Save score + questions to DB
    try {
      const gameRecord = new GameScore({
        topic,
        questions,
        score,
        total,
        source: apiSource
      });
      await gameRecord.save();
      console.log("💾 Game score saved to DB.");
    } catch (dbErr) {
      console.error("❌ Failed to save game score:", dbErr.message);
      // Don't fail the request if DB save fails
    }

    return NextResponse.json({ 
      success: true, 
      questions,
      source: apiSource
    });

  } catch (err) {
    console.error("🔥 Server Error:", err.message || err);
    return NextResponse.json(
      { success: false, error: err.message || "Server error occurred" },
      { status: 500 }
    );
  }
}