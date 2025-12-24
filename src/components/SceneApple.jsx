import React, { useState } from 'react';

export default function SceneApple({ onNext }) {
  const [bites, setBites] = useState(0);
  const [popups, setPopups] = useState([]);

  const MAX_BITES = 5;
  const WORDS = ['平安', '健康', '暴富', '快乐', '顺利', '好运'];

  const handleBite = (e) => {
    if (bites >= MAX_BITES) return;

    const newBites = bites + 1;
    setBites(newBites);

    // Add popup
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    const id = Date.now();
    const x = (Math.random() - 0.5) * 100; // Random x offset
    const y = (Math.random() - 0.5) * 50; 
    
    setPopups(prev => [...prev, { id, word, x, y }]);

    if (newBites >= MAX_BITES) {
      setTimeout(onNext, 1500);
    }
  };

  return (
    <div className="flex flex-col items-center relative w-full h-80 justify-center">
      <h2 className="text-2xl mb-4 font-bold text-red-200">哇！是平安果！</h2>
      <p className="mb-8 text-gray-300 text-sm">快把它吃掉，接收好运</p>
      
      <div className="relative">
        <button
          onClick={handleBite}
          disabled={bites >= MAX_BITES}
          className={`text-9xl transition-all duration-200 active:scale-90 select-none outline-none`}
          style={{ 
            filter: `grayscale(${bites * 20}%)`,
            transform: `scale(${1 - bites * 0.1})` 
          }}
        >
          {bites >= MAX_BITES ? '🦴' : '🍎'}
        </button>

        {/* Popups */}
        {popups.map(p => (
          <div
            key={p.id}
            className="absolute top-1/2 left-1/2 text-xl font-bold text-yellow-300 pointer-events-none whitespace-nowrap animate-float"
            style={{
              transform: `translate(calc(-50% + ${p.x}px), calc(-50% - 100px + ${p.y}px))`,
              animation: 'float 1s ease-out forwards'
            }}
          >
            {p.word} +1
          </div>
        ))}
      </div>
      
      {bites >= MAX_BITES && (
        <div className="absolute bottom-0 text-yellow-200 animate-pulse">
          剩下了一颗神奇的种子...
        </div>
      )}
    </div>
  );
}

