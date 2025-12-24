import React, { useEffect, useState } from 'react';

export default function SceneFinale({ wish }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 1000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full relative w-full">
      {/* Background Star/Firework Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Simple CSS Stars */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 2 + 's'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <div className="text-[8rem] mb-4 animate-float filter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
          🎄
        </div>
        
        <div className={`transition-all duration-1000 transform ${showText ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl max-w-xs mx-auto">
            <h3 className="text-yellow-300 font-bold mb-2 uppercase tracking-widest text-xs">Your Wish</h3>
            <p className="text-xl font-serif italic leading-relaxed text-white">
              "{wish}"
            </p>
          </div>
          
          <div className="mt-12">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-yellow-200 to-green-400">
              Merry Christmas!
            </h1>
            <p className="text-sm text-gray-400 mt-2">愿你的愿望都能实现</p>
          </div>
        </div>
      </div>
    </div>
  );
}

