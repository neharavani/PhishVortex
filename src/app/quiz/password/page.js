'use client';

import { useEffect, useState } from 'react';
import ThemePageWrapper from '../../components/ThemePageWrapper';
import ThemeCard from '../../components/ThemeCard';

export default function PasswordAttackQuizPage() {
  const questions = [
    {
      question: "What is a brute force attack?",
      options: ["Guessing passwords using all combinations", "Sending viruses", "Updating your password regularly", "None of the above"],
      answer: "Guessing passwords using all combinations",
    },
    {
      question: "Which password is considered the safest?",
      options: ["123456", "Password123", "Complex mix of letters, numbers, and symbols", "Your name and birthdate"],
      answer: "Complex mix of letters, numbers, and symbols",
    },
    {
      question: "What is a common mistake in password creation?",
      options: ["Using unique passwords", "Reusing passwords across accounts", "Using a password manager", "Using two-factor authentication"],
      answer: "Reusing passwords across accounts",
    },
    {
      question: "What is credential stuffing?",
      options: ["Reusing stolen credentials to access multiple accounts", "Stuffing passwords in emails", "Encrypting passwords", "None of the above"],
      answer: "Reusing stolen credentials to access multiple accounts",
    },
    {
      question: "A good password should:",
      options: ["Be short and simple", "Be easy to remember", "Be long and complex", "Include your personal details"],
      answer: "Be long and complex",
    },
    {
      question: "What is a password manager?",
      options: ["A tool to generate and store complex passwords", "A virus", "An email phishing tool", "None of the above"],
      answer: "A tool to generate and store complex passwords",
    },
    {
      question: "What is keylogging?",
      options: ["Recording keystrokes to capture passwords", "Encrypting data", "Monitoring network traffic", "None of the above"],
      answer: "Recording keystrokes to capture passwords",
    },
    {
      question: "What is a dictionary attack?",
      options: ["Using common words to guess passwords", "Encrypting passwords", "Creating strong passwords", "None of the above"],
      answer: "Using common words to guess passwords",
    },
    {
      question: "Two-factor authentication provides:",
      options: ["Less security", "An additional layer of security", "Slower login", "None of the above"],
      answer: "An additional layer of security",
    },
    {
      question: "If you suspect a password attack, you should:",
      options: ["Ignore it", "Change your passwords immediately", "Share your password with friends", "Uninstall antivirus"],
      answer: "Change your passwords immediately",
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

        <h2 className="text-3xl font-semibold text-cyan-400 mb-4">Password Attack Quiz</h2>

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
