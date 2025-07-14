'use client';
import React, { useEffect, useState } from 'react';
import ThemePageWrapper from '../../components/ThemePageWrapper';
import ThemeCard from '../../components/ThemeCard';

function useAnimatedNumber(value, duration = 500) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    let end = value;
    let startTime;

    function animate(time) {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const animatedValue = start + (end - start) * progress;
      setDisplayValue(animatedValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [value]);

  return Math.floor(displayValue);
}

export default function PhishOrNotGame() {
  const [emails, setEmails] = useState([]);
  const [emailIndex, setEmailIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [lastAnswer, setLastAnswer] = useState({ correct: false, explanation: '' });
  const animatedScore = useAnimatedNumber(score);

  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/generate-phishing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ count: 10 })
        });

        const data = await res.json();

        if (data.success) {
          setEmails(data.emails);
        } else {
          console.error('Error:', data.error);
        }
      } catch (err) {
        console.error('Failed to fetch emails:', err);
      }
      setLoading(false);
    };

    fetchEmails();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const handleAnswer = (isPhishing) => {
    if (showPopup) return;

    const currentEmail = emails[emailIndex];
    const isCorrect = (isPhishing === currentEmail.isPhishing);

    if (isCorrect) {
      setScore(prev => prev + 15 + Math.floor(timeLeft * 0.2));
      setCorrectCount(prev => prev + 1);
    }

    setLastAnswer({
      correct: isCorrect,
      explanation: currentEmail.explanation
    });

    setShowPopup(true);
  };

  const nextEmail = () => {
    setShowPopup(false);
    if (emailIndex < emails.length - 1) {
      setEmailIndex(prev => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const restart = () => {
    setEmailIndex(0);
    setScore(0);
    setCorrectCount(0);
    setTimeLeft(90);
    setGameOver(false);
    setShowPopup(false);
    setLoading(true);

    const fetchEmails = async () => {
      try {
        const res = await fetch('/api/generate-phishing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ count: 10 })
        });

        const data = await res.json();

        if (data.success) {
          setEmails(data.emails);
        } else {
          console.error('Error:', data.error);
        }
      } catch (err) {
        console.error('Failed to fetch emails:', err);
      }
      setLoading(false);
    };

    fetchEmails();
  };

  const currentEmail = emails[emailIndex];

  return (
    <ThemePageWrapper>
      <main className="flex items-center justify-center p-6 flex-grow">
        <ThemeCard className="max-w-2xl w-full text-center">
          <h1 className="text-2xl font-bold text-cyan-400 mb-4">🎣 Phish or Not? (AI-Powered)</h1>

          {loading ? (
            <div>
              <p>Generating emails from Hugging Face...</p>
              <div className="mt-4 h-2 bg-gray-700 rounded-full">
                <div className="h-full bg-cyan-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          ) : gameOver ? (
            <div>
              <p className="text-xl mb-2">🏁 Game Over!</p>
              <p className="text-lg mb-1">Final Score: <span className="text-green-400 font-bold">{animatedScore}</span></p>
              <p className="mb-4">Correct Answers: {correctCount}/{emails.length}</p>
              <button onClick={restart} className="bg-cyan-500 px-4 py-2 rounded hover:bg-cyan-600 font-semibold">
                🔁 Play Again
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between mb-4 text-sm sm:text-base">
                <p>⏱ Time: <span className="text-yellow-300 font-bold">{timeLeft}s</span></p>
                <p>Email {emailIndex + 1}/{emails.length}</p>
                <p>🏆 Score: <span className="text-green-400 font-bold">{animatedScore}</span></p>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 mb-4 shadow-inner max-h-[400px] overflow-y-auto text-left">
                <div className="border-b border-gray-700 pb-2 mb-3">
                  <p><strong>From:</strong> {currentEmail?.sender}</p>
                  <p><strong>To:</strong> {currentEmail?.recipient}</p>
                  <p><strong>Subject:</strong> {currentEmail?.subject}</p>
                </div>
                <div className="whitespace-pre-line">
                  {currentEmail?.body}
                </div>
              </div>

              {!showPopup ? (
                <div className="flex justify-center gap-4 mt-6 flex-wrap">
                  <button
                    onClick={() => handleAnswer(true)}
                    className="bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600 font-semibold transition"
                  >
                    🎣 It's a Phish!
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600 font-semibold transition"
                  >
                    ✅ Legitimate Email
                  </button>
                </div>
              ) : (
                <div className={`mt-4 p-4 rounded-lg ${lastAnswer.correct ? 'bg-green-800' : 'bg-red-800'}`}>
                  <h3 className="text-xl font-bold mb-2">
                    {lastAnswer.correct ? '✅ Correct!' : '❌ Wrong!'}
                  </h3>
                  <p className="mb-4">{lastAnswer.explanation}</p>
                  <div className="text-center">
                    <button
                      onClick={nextEmail}
                      className="bg-cyan-500 px-4 py-2 rounded hover:bg-cyan-600 font-semibold"
                    >
                      Next Email →
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </ThemeCard>
      </main>
    </ThemePageWrapper>
  );
}
