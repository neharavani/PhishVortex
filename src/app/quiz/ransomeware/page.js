'use client';

import { useEffect, useState } from 'react';
import ThemePageWrapper from '../../components/ThemePageWrapper';
import ThemeCard from '../../components/ThemeCard';

export default function RansomwareQuizPage() {
  const questions = [
    {
      question: "What is ransomware?",
      options: ["A security update", "Malware that locks files and demands ransom", "Free antivirus software", "None of the above"],
      answer: "Malware that locks files and demands ransom",
    },
    {
      question: "Ransomware usually demands payment in:",
      options: ["Credit card", "Cryptocurrency", "Cash", "Bank transfer"],
      answer: "Cryptocurrency",
    },
    {
      question: "Which of the following is a common source of ransomware infection?",
      options: ["Official software updates", "Phishing emails with malicious attachments", "Secure websites", "None of the above"],
      answer: "Phishing emails with malicious attachments",
    },
    {
      question: "What does ransomware do to your files?",
      options: ["Deletes them", "Encrypts them", "Uploads them to the cloud", "Improves their quality"],
      answer: "Encrypts them",
    },
    {
      question: "What is the best defense against ransomware?",
      options: ["Regular backups and antivirus software", "Ignoring updates", "Disabling firewalls", "Clicking on all links"],
      answer: "Regular backups and antivirus software",
    },
    {
      question: "Should you pay the ransom to recover your files?",
      options: ["Yes, always", "No, because it doesn’t guarantee recovery", "Only if it's a small amount", "Depends on the attack"],
      answer: "No, because it doesn’t guarantee recovery",
    },
    {
      question: "What is Ransomware-as-a-Service (RaaS)?",
      options: ["A cybersecurity solution", "A platform for creating and distributing ransomware", "A file encryption tool", "None of the above"],
      answer: "A platform for creating and distributing ransomware",
    },
    {
      question: "A sign of a ransomware attack is:",
      options: ["A message demanding payment to unlock files", "Faster system performance", "New antivirus notifications", "None of the above"],
      answer: "A message demanding payment to unlock files",
    },
    {
      question: "Why is ransomware dangerous?",
      options: ["It can encrypt and lock important data", "It speeds up your computer", "It prevents software updates", "It improves internet speed"],
      answer: "It can encrypt and lock important data",
    },
    {
      question: "What should you do if infected with ransomware?",
      options: ["Pay immediately", "Disconnect and report the incident", "Ignore the warnings", "Share the malware"],
      answer: "Disconnect and report the incident",
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

        <h2 className="text-3xl font-semibold text-cyan-400 mb-4">Ransomware Attack Quiz</h2>

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
