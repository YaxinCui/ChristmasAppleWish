import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function SceneGift({ onNext }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    
    // 爆炸特效
    const duration = 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#00ff00', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#00ff00', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    setTimeout(() => {
      onNext();
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-2xl mb-12 font-display text-yellow-100 tracking-widest text-shadow"
      >
        To: You
      </motion.div>

      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.9 }}
        animate={isOpening ? { 
          scale: [1, 1.2, 0],
          rotate: [0, 10, -10, 20, -20, 0],
          opacity: [1, 1, 0]
        } : {
          y: [0, -10, 0],
        }}
        transition={isOpening ? { duration: 0.8 } : { repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="relative group cursor-pointer"
      >
        {/* 光晕背景 */}
        <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
        
        {/* 3D 礼物盒 Emoji 替换为更精致的 SVG 或保持 Emoji 但增加阴影 */}
        <div className="text-[9rem] relative z-10 filter drop-shadow-2xl">
          🎁
        </div>
      </motion.button>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className={`mt-16 text-sm text-pink-200/70 tracking-[0.3em] uppercase glass-card px-6 py-2 rounded-full ${isOpening ? 'opacity-0' : ''}`}
      >
        Tap to Open
      </motion.p>
    </div>
  );
}
