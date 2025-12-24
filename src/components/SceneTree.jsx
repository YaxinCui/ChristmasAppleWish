import React, { useEffect, useState } from 'react';

export default function SceneTree({ onNext }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center animate-fade-in w-full">
      <div className="relative mb-8 transform transition-all duration-1000 animate-grow origin-bottom">
        {/* Simple Tree Art with CSS/Text */}
        <div className="text-[10rem] leading-none filter drop-shadow-[0_0_15px_rgba(0,255,0,0.5)]">
          🎄
        </div>
        {/* Lights (simulated) */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-12 w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75"></div>
        <div className="absolute bottom-10 left-16 w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-150"></div>
      </div>

      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-green-200 animate-pulse">
        圣诞树长大了！
      </h2>
      
      <p className="mt-4 text-center text-gray-300 max-w-xs opacity-0 animate-[fadeIn_1s_ease-in_forwards_1s]">
        树下好像有什么东西...
      </p>

      {showButton && (
        <button
          onClick={onNext}
          className="mt-8 px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all animate-bounce"
        >
          查看树下的礼物
        </button>
      )}
    </div>
  );
}

