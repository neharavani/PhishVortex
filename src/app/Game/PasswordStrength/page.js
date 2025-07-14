'use client';
import React, { useState, useEffect } from 'react';
import ThemePageWrapper from '../../components/ThemePageWrapper';
import ThemeCard from '../../components/ThemeCard';

export default function PasswordStrengthPage() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState({ label: 'Too Weak', score: 10 });
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Timer countdown
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGameOver(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    const calculateStrength = (pwd) => {
      let score = 0;
      if (pwd.length >= 6) score += 20;
      if (/[A-Z]/.test(pwd)) score += 20;
      if (/[a-z]/.test(pwd)) score += 20;
      if (/[0-9]/.test(pwd)) score += 20;
      if (/[\W_]/.test(pwd)) score += 20;

      let label = 'Too Weak';
      if (score >= 40 && score < 60) label = 'Moderate';
      if (score >= 60 && score < 80) label = 'Strong';
      if (score >= 80) label = 'Unbreakable';

      return { label, score };
    };

    setStrength(calculateStrength(password));
  }, [password]);

  const handleSubmit = () => {
    if (strength.label === 'Strong' || strength.label === 'Unbreakable') {
      setScore(score + 1);
    }
    setPassword('');
  };

  const strengthColor = {
    'Too Weak': 'text-red-500',
    'Moderate': 'text-yellow-400',
    'Strong': 'text-green-500',
    'Unbreakable': 'text-cyan-400 font-bold',
  };

  return (
    <ThemePageWrapper>
      <main className="flex items-center justify-center p-6 flex-grow">
        <ThemeCard className="max-w-md w-full">
          <h1 className="text-2xl font-bold text-cyan-400 text-center mb-4">Password Strength Challenge</h1>

          {gameOver ? (
            <div className="text-center">
              <h2 className="text-xl mb-4">⏱ Time's Up!</h2>
              <p className="text-lg mb-4">Your Score: <span className="text-green-400 font-bold">{score}</span></p>
              <button
                onClick={() => {
                  setTimeLeft(60);
                  setScore(0);
                  setPassword('');
                  setGameOver(false);
                }}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <p>⏱ Time Left: <span className="text-yellow-300 font-bold">{timeLeft}s</span></p>
                <p>🏆 Score: <span className="text-green-400 font-bold">{score}</span></p>
              </div>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 mb-4"
                disabled={gameOver}
              />

              <p className="text-lg mb-2">
                Strength: <span className={strengthColor[strength.label]}>{strength.label}</span>
              </p>
              <progress value={strength.score} max="100" className="w-full mb-4" />

              <button
                onClick={handleSubmit}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded w-full"
                disabled={gameOver}
              >
                Submit Password
              </button>
            </>
          )}
        </ThemeCard>
      </main>
    </ThemePageWrapper>
  );
}