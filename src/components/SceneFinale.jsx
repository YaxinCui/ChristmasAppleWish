import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function SceneFinale({ wish }) {
  const [showText, setShowText] = useState(false);
  const [burstDone, setBurstDone] = useState(false);
  const stars = useMemo(() => [...Array(28)].map((_, i) => i), []);

  useEffect(() => {
    setTimeout(() => setShowText(true), 1000);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (burstDone) return;
      setBurstDone(true);
      const end = Date.now() + 1200;
      (function frame() {
        confetti({
          particleCount: 10,
          startVelocity: 30,
          spread: 360,
          scalar: 0.9,
          origin: { x: Math.random() * 0.6 + 0.2, y: Math.random() * 0.3 + 0.1 },
          colors: ['#f472b6', '#a78bfa', '#fbbf24', '#34d399', '#ffffff'],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }, 900);
    return () => clearTimeout(t);
  }, [burstDone]);

  return (
    <div className="flex flex-col items-center justify-center h-full relative w-full">
      {/* Background Star/Firework Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Simple CSS Stars */}
        {stars.map((i) => (
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
        {/* Shooting Star */}
        <motion.div
          initial={{ x: -260, y: -120, opacity: 0 }}
          animate={{ x: 260, y: 120, opacity: [0, 1, 0] }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="absolute -top-24 left-1/2 -translate-x-1/2"
        >
          <div className="w-44 h-[2px] bg-gradient-to-r from-white/0 via-white to-white/0 blur-[0.2px]" />
          <div className="w-2 h-2 rounded-full bg-white -mt-[3px] ml-36 shadow-[0_0_18px_rgba(255,255,255,0.9)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="text-[8rem] mb-2 filter drop-shadow-[0_0_22px_rgba(255,255,255,0.35)]"
        >
          🎄
        </motion.div>
        
        <div className={`transition-all duration-1000 transform ${showText ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="glass-card glow p-6 rounded-3xl border border-white/25 shadow-2xl max-w-sm mx-auto">
            <h3 className="text-yellow-200 font-semibold mb-2 tracking-[0.25em] text-[11px] uppercase">Your Wish</h3>
            <p className="text-xl leading-relaxed text-white/95 font-display tracking-wide">
              “{wish}”
            </p>
            <div className="mt-4 text-xs text-white/60">
              已封存到圣诞树的星光里 ✨
            </div>
          </div>
          
          <div className="mt-12">
            <h1 className="text-4xl font-display bg-clip-text text-transparent bg-gradient-to-r from-red-300 via-yellow-200 to-green-300">
              Merry Christmas
            </h1>
            <p className="text-sm text-white/60 mt-2 tracking-wide">愿你的愿望都能实现</p>
          </div>
        </div>
      </div>
    </div>
  );
}

