'use client';

import { useEffect, useState } from 'react';
import ThemePageWrapper from '../../components/ThemePageWrapper';
import ThemeCard from '../../components/ThemeCard';

export default function AdwareQuizPage() {
  const questions = [
    {
      question: "What is adware?",
      options: ["Software that displays unwanted ads", "A type of antivirus", "A legal advertisement campaign", "None of the above"],
      answer: "Software that displays unwanted ads",
    },
    {
      question: "How does adware commonly spread?",
      options: ["Through software bundles", "Official app stores", "Operating system updates", "None of the above"],
      answer: "Through software bundles",
    },
    {
      question: "A major risk of adware is:",
      options: ["Improved security", "Slower system performance and privacy risks", "Better battery life", "Automatic backups"],
      answer: "Slower system performance and privacy risks",
    },
    {
      question: "What does adware often do?",
      options: ["Block malicious ads", "Track your online activities", "Improve system performance", "Encrypt files"],
      answer: "Track your online activities",
    },
    {
      question: "What is a sign of adware infection?",
      options: ["Clean browsing experience", "Excessive pop-up ads", "Faster browsing speed", "None of the above"],
      answer: "Excessive pop-up ads",
    },
    {
      question: "To avoid adware, you should:",
      options: ["Download from trusted sources", "Click on every ad", "Disable antivirus software", "Ignore software updates"],
      answer: "Download from trusted sources",
    },
    {
      question: "What is 'bundled adware'?",
      options: ["Adware hidden inside other software downloads", "An ad-blocker tool", "An operating system update", "None of the above"],
      answer: "Adware hidden inside other software downloads",
    },
    {
      question: "What can adware do besides show ads?",
      options: ["Steal personal data", "Speed up internet", "Protect your device", "None of the above"],
      answer: "Steal personal data",
    },
    {
      question: "What should you do if your device shows frequent unwanted ads?",
      options: ["Install adware removal software", "Ignore them", "Share them with friends", "Click to see more"],
      answer: "Install adware removal software",
    },
    {
      question: "How can ad-blockers help?",
      options: ["Increase adware infections", "Block unwanted ads and reduce adware risk", "Disable antivirus software", "None of the above"],
      answer: "Block unwanted ads and reduce adware risk",
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
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">Adware Attack Quiz</h2>

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