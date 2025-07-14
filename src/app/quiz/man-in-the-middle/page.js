'use client';

import { useEffect, useState } from 'react';
import ThemePageWrapper from '../../components/ThemePageWrapper';
import ThemeCard from '../../components/ThemeCard';

export default function MITMQuizPage() {
  const questions = [
    {
      question: "What does MITM stand for in cybersecurity?",
      options: ["Mail in the Mailbox", "Man-in-the-Middle", "Main Internet Traffic Monitor", "Message in Transmission"],
      answer: "Man-in-the-Middle",
    },
    {
      question: "What is the goal of a MITM attack?",
      options: ["Secure communication", "Intercept and manipulate communication", "Improve network speed", "Block viruses"],
      answer: "Intercept and manipulate communication",
    },
    {
      question: "Which network is more vulnerable to MITM attacks?",
      options: ["Public Wi-Fi networks", "Secured VPNs", "Private home networks", "All of the above"],
      answer: "Public Wi-Fi networks",
    },
    {
      question: "Which method is used in MITM attacks?",
      options: ["Keylogging", "Packet sniffing", "Software updates", "Firewall installation"],
      answer: "Packet sniffing",
    },
    {
      question: "HTTPS protects against MITM by:",
      options: ["Providing encryption", "Slowing down the internet", "Disabling security", "None of the above"],
      answer: "Providing encryption",
    },
    {
      question: "A common sign of MITM attack is:",
      options: ["Slow browsing", "Unexpected certificate warnings", "Fast download speed", "Clear web pages"],
      answer: "Unexpected certificate warnings",
    },
    {
      question: "What is session hijacking?",
      options: ["Upgrading browsers", "Stealing active session tokens", "Sending promotional emails", "Installing software"],
      answer: "Stealing active session tokens",
    },
    {
      question: "What is DNS spoofing?",
      options: ["Changing DNS settings to redirect traffic", "Encrypting web pages", "Creating secure passwords", "None of the above"],
      answer: "Changing DNS settings to redirect traffic",
    },
    {
      question: "To prevent MITM attacks, you should:",
      options: ["Use public Wi-Fi freely", "Avoid encryption", "Use VPN and HTTPS", "Disable antivirus"],
      answer: "Use VPN and HTTPS",
    },
    {
      question: "If you suspect MITM, you should:",
      options: ["Ignore it", "Continue using the network", "Disconnect and alert security team", "Post about it online"],
      answer: "Disconnect and alert security team",
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

        <h2 className="text-3xl font-semibold text-cyan-400 mb-4">Man-in-the-Middle (MITM) Attack Quiz</h2>

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
