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

export default function TimedQuizGame() {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);
  const animatedScore = useAnimatedNumber(score);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/generate-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic: 'cybersecurity', count: 10 })
        });

        const data = await res.json();

        if (data.success) {
          setQuestions(data.questions);
        } else {
          console.error('Error:', data.error);
        }
      } catch (err) {
        console.error('Failed to fetch questions:', err);
      }
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const handleAnswer = (option) => {
    if (selected) return;
    setSelected(option);

    const correct = questions[questionIndex].answer === option;
    if (correct) {
      setScore(prev => prev + 10 + timeLeft * 0.1); // speed bonus
      setCorrectCount(prev => prev + 1);
    }

    setTimeout(() => {
      setSelected(null);
      setQuestionIndex((prev) => (prev + 1) % questions.length);
    }, 800);
  };

  const restart = () => {
    setQuestionIndex(0);
    setScore(0);
    setCorrectCount(0);
    setTimeLeft(60);
    setGameOver(false);
    setSelected(null);
  };

  const current = questions[questionIndex];

  return (
    <ThemePageWrapper>
      <main className="flex items-center justify-center p-6 flex-grow">
        <ThemeCard className="max-w-lg w-full text-center">
          <h1 className="text-2xl font-bold text-cyan-400 mb-4">⚡ Speed Quiz (AI-Powered)</h1>

          {loading ? (
            <p>Loading questions from Hugging Face...</p>
          ) : gameOver ? (
            <div>
              <p className="text-xl mb-2">⏱ Time's up!</p>
              <p className="text-lg mb-1">Score: <span className="text-green-400 font-bold">{animatedScore}</span></p>
              <p className="mb-4">Correct Answers: {correctCount}</p>
              <button onClick={restart} className="bg-cyan-500 px-4 py-2 rounded hover:bg-cyan-600 font-semibold">
                🔁 Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between mb-2">
                <p>⏱ Time: <span className="text-yellow-300 font-bold">{timeLeft}s</span></p>
                <p>🏆 Score: <span className="text-green-400 font-bold">{animatedScore}</span></p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold">{current?.question}</p>
                <div className="mt-3 space-y-2">
                  {current?.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt)}
                      className={`w-full text-left px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 transition ${
                        selected === opt
                          ? opt === current.answer
                            ? 'bg-green-500'
                            : 'bg-red-500'
                          : ''
                      }`}
                      disabled={!!selected}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </ThemeCard>
      </main>
    </ThemePageWrapper>
  );
}
