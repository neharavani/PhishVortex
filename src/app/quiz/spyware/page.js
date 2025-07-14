'use client';

import { useEffect, useState } from 'react';
import ThemePageWrapper from '../../components/ThemePageWrapper';
import ThemeCard from '../../components/ThemeCard';

export default function SpywareQuizPage() {
  const questions = [
    {
      question: "What is spyware?",
      options: ["A tool to enhance system speed", "Malicious software that secretly collects user data", "An antivirus program", "Legal tracking software"],
      answer: "Malicious software that secretly collects user data",
    },
    {
      question: "Spyware primarily aims to:",
      options: ["Enhance your system's performance", "Steal sensitive information", "Block pop-ups", "Improve battery life"],
      answer: "Steal sensitive information",
    },
    {
      question: "A common sign of spyware infection is:",
      options: ["Increased device performance", "Pop-ups and system slowdown", "Free security alerts", "None of the above"],
      answer: "Pop-ups and system slowdown",
    },
    {
      question: "Which of these can install spyware?",
      options: ["Free software from untrusted sources", "Official operating system updates", "Certified antivirus programs", "Official browsers"],
      answer: "Free software from untrusted sources",
    },
    {
      question: "What does a keylogger do?",
      options: ["Speed up your typing", "Record your keystrokes", "Fix spelling mistakes", "None of the above"],
      answer: "Record your keystrokes",
    },
    {
      question: "How can you prevent spyware infection?",
      options: ["Click on random ads", "Install legitimate anti-spyware software", "Disable antivirus", "Share your password online"],
      answer: "Install legitimate anti-spyware software",
    },
    {
      question: "Spyware can steal:",
      options: ["Weather updates", "Bank details and passwords", "Game updates", "None of the above"],
      answer: "Bank details and passwords",
    },
    {
      question: "What should you do if you suspect spyware?",
      options: ["Ignore it", "Disconnect from the internet and run a scan", "Download more free software", "Uninstall antivirus"],
      answer: "Disconnect from the internet and run a scan",
    },
    {
      question: "Spyware often comes bundled with:",
      options: ["Licensed software", "Freeware or shareware from unknown sources", "Paid subscriptions", "Hardware upgrades"],
      answer: "Freeware or shareware from unknown sources",
    },
    {
      question: "To reduce spyware risk, you should:",
      options: ["Use ad-blockers and security tools", "Disable updates", "Download from unknown sites", "Ignore security alerts"],
      answer: "Use ad-blockers and security tools",
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

        <h2 className="text-3xl font-semibold text-cyan-400 mb-4">Spyware Quiz</h2>

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
