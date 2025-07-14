'use client';

import { useEffect, useState } from 'react';
import ThemePageWrapper from '../../components/ThemePageWrapper';
import ThemeCard from '../../components/ThemeCard';

export default function PhishingQuizPage() {
  const questions = [
    {
      question: "What is the primary goal of a phishing attack?",
      options: ["To entertain users", "To steal sensitive information", "To improve network speed", "To update software"],
      answer: "To steal sensitive information",
    },
    {
      question: "Which of the following is a common sign of phishing?",
      options: ["Unexpected email attachments", "High-quality grammar", "Secure website URLs", "Emails from trusted colleagues"],
      answer: "Unexpected email attachments",
    },
    {
      question: "A phishing email often creates a sense of:",
      options: ["Security", "Urgency", "Satisfaction", "Relaxation"],
      answer: "Urgency",
    },
    {
      question: "What should you do if you receive a suspicious link?",
      options: ["Click it to verify", "Ignore it", "Report it to IT", "Forward to colleagues"],
      answer: "Report it to IT",
    },
    {
      question: "Phishing can also occur via:",
      options: ["Phone calls", "Text messages", "Fake websites", "All of the above"],
      answer: "All of the above",
    },
    {
      question: "A legitimate organization will never ask for ______ via email.",
      options: ["Feedback", "Sensitive personal information", "Newsletter signup", "Public event invitations"],
      answer: "Sensitive personal information",
    },
    {
      question: "What is 'spear phishing'?",
      options: ["Random attack on many people", "Targeted attack at specific individual", "Attack on hardware", "Anti-virus software"],
      answer: "Targeted attack at specific individual",
    },
    {
      question: "Which action helps prevent phishing?",
      options: ["Using outdated browsers", "Enabling email filters", "Ignoring software updates", "Clicking all links"],
      answer: "Enabling email filters",
    },
    {
      question: "What does 'HTTPS' indicate in a web address?",
      options: ["Insecure connection", "Encrypted and secure connection", "Phishing website", "Government website"],
      answer: "Encrypted and secure connection",
    },
    {
      question: "What should you do after clicking a phishing link by mistake?",
      options: ["Ignore it", "Disconnect and report to IT", "Share with friends", "Uninstall your operating system"],
      answer: "Disconnect and report to IT",
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
        <h2 className="text-3xl font-semibold text-cyan-400 mb-4">Phishing Awareness Quiz</h2>

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
