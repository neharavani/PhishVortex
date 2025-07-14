'use client';

import { useEffect, useState } from 'react';
import ThemePageWrapper from '../../components/ThemePageWrapper';
import ThemeCard from '../../components/ThemeCard';

export default function FinalCombinedQuizPage() {
  const questions = [
    // Phishing Awareness
    {
      question: "Phishing attacks are primarily aimed at:",
      options: ["Stealing sensitive information", "Speeding up computers", "Installing antivirus", "None of the above"],
      answer: "Stealing sensitive information",
    },
    // Malware Prevention
    {
      question: "Which is an example of malware?",
      options: ["Trojan", "Firewall", "VPN", "None"],
      answer: "Trojan",
    },
    // Identity Protection
    {
      question: "Two-factor authentication helps to:",
      options: ["Slow down login", "Add extra security", "Steal data", "None"],
      answer: "Add extra security",
    },
    // Password Attack
    {
      question: "A strong password includes:",
      options: ["Your birth date", "Common words", "Mix of letters, numbers, symbols", "Simple patterns"],
      answer: "Mix of letters, numbers, symbols",
    },
    // Social Engineering
    {
      question: "Pretexting involves:",
      options: ["Creating a false scenario to steal information", "Using firewalls", "Encrypting data", "None"],
      answer: "Creating a false scenario to steal information",
    },
    // MITM
    {
      question: "Man-in-the-middle attacks often happen on:",
      options: ["Public Wi-Fi", "Encrypted VPNs", "Secure servers", "None"],
      answer: "Public Wi-Fi",
    },
    // Spyware
    {
      question: "Spyware is designed to:",
      options: ["Protect your data", "Secretly monitor user activity", "Increase speed", "None"],
      answer: "Secretly monitor user activity",
    },
    // Cryptojacking
    {
      question: "Cryptojacking uses your device to:",
      options: ["Mine cryptocurrency", "Send emails", "Block ads", "None"],
      answer: "Mine cryptocurrency",
    },
    // Ransomware
    {
      question: "Ransomware attacks usually involve:",
      options: ["Encrypting your files and demanding ransom", "Improving device performance", "Sending newsletters", "None"],
      answer: "Encrypting your files and demanding ransom",
    },
    // Adware
    {
      question: "Adware is known for:",
      options: ["Improving security", "Showing unwanted advertisements", "Boosting battery life", "None"],
      answer: "Showing unwanted advertisements",
    },
    // Bonus mixed
    {
      question: "The best defense against most cyber attacks is:",
      options: ["Ignoring updates", "Regular software updates and awareness", "Clicking ads", "Sharing passwords"],
      answer: "Regular software updates and awareness",
    },
    {
      question: "If you suspect a cyber attack, you should:",
      options: ["Ignore it", "Report it immediately", "Share with friends", "None"],
      answer: "Report it immediately",
    },
    {
      question: "Using public Wi-Fi safely requires:",
      options: ["Disabling antivirus", "Using a VPN", "Clicking ads", "None"],
      answer: "Using a VPN",
    },
    {
      question: "What is credential stuffing?",
      options: ["Reusing stolen credentials to access accounts", "Encrypting data", "Updating software", "None"],
      answer: "Reusing stolen credentials to access accounts",
    },
    {
      question: "Which is a good cyber hygiene practice?",
      options: ["Using unique passwords", "Sharing passwords", "Ignoring updates", "Clicking random links"],
      answer: "Using unique passwords",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentQuestion]);

  return (
     <ThemePageWrapper>
      <main className="flex items-center justify-center p-6 flex-grow">
        <ThemeCard className="max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">Final Combined Quiz</h2>

        {!showResult ? (
          <div className="w-full">
            <h3 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h3>
            <div className="grid grid-cols-1 gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="p-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white transition-colors duration-300"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Quiz Completed!</h3>
            <p className="text-xl">Your Score: {score} / {questions.length}</p>
          </div>
        )}
        </ThemeCard>
      </main>
    </ThemePageWrapper>
  );
}
