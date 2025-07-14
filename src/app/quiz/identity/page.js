'use client';

import { useEffect, useState } from 'react';
import ThemePageWrapper from '../../components/ThemePageWrapper';
import ThemeCard from '../../components/ThemeCard';

export default function IdentityProtectionQuizPage() {
  const questions = [
    {
      question: "What is identity theft?",
      options: ["Stealing physical property", "Using someone else's personal information illegally", "Borrowing someone's ID with permission", "None of the above"],
      answer: "Using someone else's personal information illegally",
    },
    {
      question: "Which of the following helps protect your identity?",
      options: ["Using strong, unique passwords", "Sharing passwords", "Using public Wi-Fi without a VPN", "Ignoring security updates"],
      answer: "Using strong, unique passwords",
    },
    {
      question: "Two-factor authentication adds:",
      options: ["Extra inconvenience", "An extra layer of security", "Slower internet speed", "None of the above"],
      answer: "An extra layer of security",
    },
    {
      question: "What personal information should you avoid sharing publicly?",
      options: ["Your favorite color", "Your pet's name", "Your date of birth and address", "Your movie preferences"],
      answer: "Your date of birth and address",
    },
    {
      question: "Phishing scams often aim to steal:",
      options: ["Your personal identity details", "Weather updates", "Your social media posts", "None of the above"],
      answer: "Your personal identity details",
    },
    {
      question: "Why should you shred personal documents before discarding them?",
      options: ["To reduce waste", "To prevent identity theft", "To make recycling easier", "To save space"],
      answer: "To prevent identity theft",
    },
    {
      question: "Which is a sign of potential identity theft?",
      options: ["Unrecognized transactions", "Faster internet speed", "Promotional emails", "Low electricity bills"],
      answer: "Unrecognized transactions",
    },
    {
      question: "Why is it risky to use public Wi-Fi without protection?",
      options: ["Your data can be intercepted by attackers", "Internet speed is always slow", "It's illegal", "None of the above"],
      answer: "Your data can be intercepted by attackers",
    },
    {
      question: "What is a good practice for account security?",
      options: ["Reusing the same password", "Using a password manager", "Writing passwords on sticky notes", "Sharing passwords with friends"],
      answer: "Using a password manager",
    },
    {
      question: "What should you do if you suspect identity theft?",
      options: ["Ignore it", "Report to authorities immediately", "Post about it on social media", "Close all accounts immediately"],
      answer: "Report to authorities immediately",
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
        <h2 className="text-3xl font-semibold text-cyan-400 mb-4">Identity Protection Quiz</h2>

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
