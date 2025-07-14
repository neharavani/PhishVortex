'use client';

import { useEffect, useState } from 'react';
import ThemePageWrapper from '../../components/ThemePageWrapper';
import ThemeCard from '../../components/ThemeCard';

export default function SocialEngineeringQuizPage() {
  const questions = [
    {
      question: "What is social engineering in cybersecurity?",
      options: ["Building firewalls", "Manipulating people to give up confidential info", "Programming viruses", "Encrypting data"],
      answer: "Manipulating people to give up confidential info",
    },
    {
      question: "Which is a common method of social engineering?",
      options: ["Pretexting", "Firewall configuration", "Data encryption", "Two-factor authentication"],
      answer: "Pretexting",
    },
    {
      question: "Tailgating refers to:",
      options: ["Driving closely", "Following authorized personnel into restricted areas", "Installing malware", "Spamming emails"],
      answer: "Following authorized personnel into restricted areas",
    },
    {
      question: "Baiting in cybersecurity involves:",
      options: ["Offering something attractive to lure victims", "Fixing network issues", "Updating software", "None of the above"],
      answer: "Offering something attractive to lure victims",
    },
    {
      question: "Quid Pro Quo attack offers:",
      options: ["Free Wi-Fi", "A service in exchange for information", "Free software updates", "None of the above"],
      answer: "A service in exchange for information",
    },
    {
      question: "What is vishing?",
      options: ["Voice phishing via phone calls", "Phishing via video", "Malware update", "Secure voice communication"],
      answer: "Voice phishing via phone calls",
    },
    {
      question: "To prevent social engineering attacks, you should:",
      options: ["Trust all unsolicited emails", "Verify identities before sharing info", "Share passwords", "Disable antivirus"],
      answer: "Verify identities before sharing info",
    },
    {
      question: "What is pretexting?",
      options: ["Creating a false scenario to steal data", "Encrypting files", "Upgrading browsers", "None of the above"],
      answer: "Creating a false scenario to steal data",
    },
    {
      question: "Which of the following is a red flag of social engineering?",
      options: ["Unsolicited request for personal information", "Normal system updates", "Secure website access", "Two-factor authentication"],
      answer: "Unsolicited request for personal information",
    },
    {
      question: "What should you do if you suspect a social engineering attempt?",
      options: ["Ignore it", "Report it to your security team", "Share it with friends", "Respond to confirm details"],
      answer: "Report it to your security team",
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

        <h2 className="text-3xl font-semibold text-cyan-400 mb-4">Social Engineering Quiz</h2>

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
