'use client';
import React, { useEffect, useState, useRef } from 'react';
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

export default function PhishingScavengerHunt() {
  const [emails, setEmails] = useState([]);
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [foundClues, setFoundClues] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [hintPenalty, setHintPenalty] = useState(0);
  const animatedScore = useAnimatedNumber(score);
  const emailContainerRef = useRef(null);

  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/generate-phishing-hunt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ count: 5 })
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

  useEffect(() => {
    // Reset found clues when moving to a new email
    setFoundClues([]);
    setHintUsed(false);
    setHintPenalty(0);
    setShowHint(false);
  }, [currentEmailIndex]);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection.toString().trim().length > 0) {
      setSelectedText(selection.toString().trim());
    }
  };

  const handleClueSubmit = () => {
    if (!selectedText) return;
    
    const currentEmail = emails[currentEmailIndex];
    const clues = currentEmail.phishingClues;
    
    // Check if selected text matches any clue
    let matched = false;
    for (let i = 0; i < clues.length; i++) {
      const clue = clues[i];
      if (
        !foundClues.includes(i) && 
        (
          selectedText.toLowerCase().includes(clue.text.toLowerCase()) || 
          clue.text.toLowerCase().includes(selectedText.toLowerCase())
        )
      ) {
        // Found a new clue!
        setFoundClues(prev => [...prev, i]);
        
        // Calculate score based on time left and hint usage
        const timeBonus = Math.floor(timeLeft * 0.2);
        const basePoints = 25;
        const points = hintUsed ? Math.max(basePoints - hintPenalty, 10) : basePoints;
        
        setScore(prev => prev + points + timeBonus);
        
        matched = true;
        break;
      }
    }
    
    setSelectedText('');
    
    // Check if all clues are found
    if (matched && foundClues.length + 1 === clues.length) {
      // All clues found, add completion bonus
      setScore(prev => prev + 50);
      
      // Show success message for 2 seconds before moving to next email
      setTimeout(() => {
        moveToNextEmail();
      }, 2000);
    }
  };

  const moveToNextEmail = () => {
    if (currentEmailIndex < emails.length - 1) {
      setCurrentEmailIndex(prev => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const skipEmail = () => {
    // Skip with penalty
    setScore(prev => Math.max(prev - 30, 0));
    moveToNextEmail();
  };

  const useHint = () => {
    setShowHint(true);
    setHintUsed(true);
    setHintPenalty(prev => prev + 5);
    // Penalty for using hint is already factored into the clue's score calculation
  };

  const restart = () => {
    setCurrentEmailIndex(0);
    setScore(0);
    setTimeLeft(120);
    setGameOver(false);
    setFoundClues([]);
    setSelectedText('');
    setShowHint(false);
    setHintUsed(false);
    setHintPenalty(0);
    setLoading(true);
    
    // Fetch new emails for a fresh game
    const fetchEmails = async () => {
      try {
        const res = await fetch('/api/generate-phishing-hunt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ count: 5 })
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

  const currentEmail = emails[currentEmailIndex];
  const totalClues = currentEmail?.phishingClues?.length || 0;

  return (
    <ThemePageWrapper>
      <main className="flex items-center justify-center p-6 flex-grow">
        <ThemeCard className="max-w-3xl w-full">
          <h1 className="text-2xl font-bold text-cyan-400 mb-4 text-center">🔍 Phishing Scavenger Hunt</h1>

          {loading ? (
            <div className="text-center">
              <p>Generating phishing emails from Hugging Face...</p>
              <div className="mt-4 h-2 bg-gray-700 rounded-full">
                <div className="h-full bg-cyan-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          ) : gameOver ? (
            <div className="text-center">
              <p className="text-xl mb-2">🏁 Game Over!</p>
              <p className="text-lg mb-1">Final Score: <span className="text-green-400 font-bold">{animatedScore}</span></p>
              <p className="mb-4">You've completed the scavenger hunt!</p>
              <button onClick={restart} className="bg-cyan-500 px-4 py-2 rounded hover:bg-cyan-600 font-semibold">
                🔄 Play Again
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p>⏱ Time: <span className="text-yellow-300 font-bold">{timeLeft}s</span></p>
                </div>
                <div className="text-center">
                  <p>Email {currentEmailIndex + 1}/{emails.length}</p>
                  <p>Found: <span className="text-green-400 font-bold">{foundClues.length}/{totalClues}</span> clues</p>
                </div>
                <div>
                  <p>🏆 Score: <span className="text-green-400 font-bold">{animatedScore}</span></p>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 mb-4 shadow-inner max-h-[400px] overflow-y-auto"
                  onMouseUp={handleTextSelection}
                  ref={emailContainerRef}>
                <div className="border-b border-gray-700 pb-2 mb-3">
                  <p><strong>From:</strong> {currentEmail?.sender}</p>
                  <p><strong>To:</strong> {currentEmail?.recipient}</p>
                  <p><strong>Subject:</strong> {currentEmail?.subject}</p>
                </div>
                <div className="whitespace-pre-line">
                  {currentEmail?.body}
                </div>
              </div>

              {/* Instructions and controls */}
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <p className="mb-2"><strong>Instructions:</strong> Select suspicious text in the email and click "Submit Clue" to identify phishing elements.</p>
                
                {foundClues.length > 0 && (
                  <div className="mt-2 mb-3">
                    <p className="font-bold text-green-400">Found Clues:</p>
                    <ul className="list-disc ml-5">
                      {foundClues.map((clueIndex) => (
                        <li key={clueIndex} className="text-green-300">
                          {currentEmail.phishingClues[clueIndex].text} - {currentEmail.phishingClues[clueIndex].explanation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {showHint && !foundClues.includes(0) && (
                  <div className="mt-2 mb-3 p-2 bg-yellow-800 rounded">
                    <p className="font-bold text-yellow-300">Hint:</p>
                    <p>{currentEmail?.phishingClues[0]?.hint || "Look for suspicious URLs or urgent language."}</p>
                  </div>
                )}

                <div className="flex items-center mt-3">
                  <input 
                    type="text" 
                    value={selectedText} 
                    onChange={(e) => setSelectedText(e.target.value)}
                    placeholder="Selected text will appear here..."
                    className="flex-grow p-2 bg-gray-700 rounded-l border-r border-gray-600 text-white" 
                  />
                  <button 
                    onClick={handleClueSubmit}
                    disabled={!selectedText}
                    className="bg-green-600 px-4 py-2 rounded-r hover:bg-green-700 font-semibold disabled:bg-gray-600"
                  >
                    Submit Clue
                  </button>
                </div>
              </div>

              <div className="flex justify-between">
                <button 
                  onClick={skipEmail} 
                  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 font-semibold"
                >
                  Skip (-30 pts)
                </button>
                
                <button 
                  onClick={useHint}
                  disabled={showHint}
                  className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 font-semibold disabled:bg-gray-600"
                >
                  Get Hint
                </button>
                
                {foundClues.length === totalClues && (
                  <button 
                    onClick={moveToNextEmail} 
                    className="bg-cyan-500 px-4 py-2 rounded hover:bg-cyan-600 font-semibold"
                  >
                    Next Email
                  </button>
                )}
              </div>
            </>
          )}
        </ThemeCard>
      </main>
    </ThemePageWrapper>
  );
}