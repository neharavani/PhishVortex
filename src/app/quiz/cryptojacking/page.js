'use client';

import { useEffect, useState } from 'react';
import ThemePageWrapper from '../../components/ThemePageWrapper';
import ThemeCard from '../../components/ThemeCard';

export default function CryptojackingQuizPage() {
  const questions = [
    {
      question: "What is cryptojacking?",
      options: ["A legal method to mine cryptocurrency", "Unauthorized use of someone's device to mine cryptocurrency", "A way to protect crypto wallets", "An antivirus feature"],
      answer: "Unauthorized use of someone's device to mine cryptocurrency",
    },
    {
      question: "Cryptojacking primarily targets:",
      options: ["Computer processing power", "User passwords", "Data storage", "Physical hardware"],
      answer: "Computer processing power",
    },
    {
      question: "A common symptom of cryptojacking is:",
      options: ["Faster device performance", "Overheating and slow performance", "Longer battery life", "None of the above"],
      answer: "Overheating and slow performance",
    },
    {
      question: "How is cryptojacking often delivered?",
      options: ["Via official software updates", "Through malicious websites or infected software", "Government software", "Social media updates"],
      answer: "Through malicious websites or infected software",
    },
    {
      question: "To protect against cryptojacking, you should:",
      options: ["Use outdated browsers", "Disable antivirus", "Install ad blockers and antivirus", "Ignore security warnings"],
      answer: "Install ad blockers and antivirus",
    },
    {
      question: "Cryptojacking scripts can run:",
      options: ["Only in mobile apps", "Only in email attachments", "In web browsers while visiting infected sites", "Only in hardware"],
      answer: "In web browsers while visiting infected sites",
    },
    {
      question: "Why do cybercriminals prefer cryptojacking?",
      options: ["It's easy to detect", "It provides them with financial gain quietly", "It's legal worldwide", "None of the above"],
      answer: "It provides them with financial gain quietly",
    },
    {
      question: "What should you do if you suspect cryptojacking?",
      options: ["Ignore it", "Run security scans and close suspicious browser tabs", "Share your crypto keys", "Disable your firewall"],
      answer: "Run security scans and close suspicious browser tabs",
    },
    {
      question: "A sudden spike in energy consumption may indicate:",
      options: ["Better system performance", "Cryptojacking", "Energy-saving mode", "Low power usage"],
      answer: "Cryptojacking",
    },
    {
      question: "Cryptojacking primarily impacts:",
      options: ["Data encryption", "Device performance and energy consumption", "Internet speed only", "Nothing at all"],
      answer: "Device performance and energy consumption",
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
    <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">Cryptojacking Quiz</h2>

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
