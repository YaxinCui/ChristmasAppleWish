import React, { useState } from 'react';

export default function SceneGift({ onNext }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      onNext();
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-xl mb-8 text-yellow-100 font-light tracking-widest">To: You</div>
      <button
        onClick={handleClick}
        className={`text-9xl transition-all duration-700 transform cursor-pointer
          ${clicked ? 'scale-[3] opacity-0 rotate-12' : 'animate-bounce-short hover:scale-110'}
        `}
        style={{ textShadow: '0 0 30px rgba(255,215,0,0.6)' }}
      >
        🎁
      </button>
      <p className={`mt-12 text-sm text-gray-400 tracking-widest uppercase transition-opacity duration-500 ${clicked ? 'opacity-0' : 'opacity-100'}`}>
        Tap to Open
      </p>
    </div>
  );
}

