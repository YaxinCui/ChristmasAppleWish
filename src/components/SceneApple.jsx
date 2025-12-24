import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function SceneApple({ onNext }) {
  const [bites, setBites] = useState(0);
  const [popups, setPopups] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const [collected, setCollected] = useState([]);

  const MAX_BITES = 5;
  const WORDS = useMemo(() => (['平安', '健康', '暴富', '快乐', '顺利', '好运', '发光', '不焦虑', '有勇气']), []);

  const handleBite = () => {
    if (bites >= MAX_BITES) return;

    const newBites = bites + 1;
    setBites(newBites);

    // 轻微震动反馈（移动端支持时）
    try {
      if (navigator?.vibrate) navigator.vibrate(18);
    } catch (_) {}

    // 轻微抖动 + “碎星”粒子
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 260);
    confetti({
      particleCount: 16,
      spread: 70,
      startVelocity: 18,
      scalar: 0.8,
      origin: { x: 0.5, y: 0.45 },
      colors: ['#fbbf24', '#f472b6', '#a78bfa', '#ffffff'],
    });

    // Add popup
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    const id = Date.now();
    const x = (Math.random() - 0.5) * 100; // Random x offset
    const y = (Math.random() - 0.5) * 50; 
    
    setPopups(prev => [...prev, { id, word, x, y }]);
    setCollected((prev) => [...prev, word]);
    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== id));
    }, 1200);

    if (newBites >= MAX_BITES) {
      setTimeout(() => onNext(collected.concat([word])), 1500);
    }
  };

  return (
    <div className="flex flex-col items-center relative w-full h-[28rem] justify-center">
      <div className="glass-card glow rounded-3xl px-6 py-5 w-full">
        <h2 className="text-2xl mb-1 font-bold text-red-100 font-display tracking-wide">
          一口一个祝福
        </h2>
        <p className="text-gray-200/80 text-sm">
          点击苹果吃掉烦恼，收集好运气
        </p>
      
        <div className="relative mt-8 flex items-center justify-center">
          <motion.button
            onClick={handleBite}
            disabled={bites >= MAX_BITES}
            whileTap={{ scale: 0.92 }}
            animate={isShaking ? { rotate: [0, -6, 6, -4, 4, 0] } : { rotate: 0 }}
            transition={{ duration: 0.26 }}
            className="relative select-none outline-none touch-manipulation"
            aria-label="bite-apple"
          >
            <div className="absolute inset-0 rounded-full blur-3xl bg-red-400/25" />
            <div
              className="text-[9rem] leading-none relative drop-shadow-2xl"
              style={{
                filter: `grayscale(${Math.min(100, bites * 18)}%)`,
                transform: `scale(${1 - bites * 0.08})`,
                transition: 'transform 160ms ease, filter 160ms ease',
              }}
            >
              {bites >= MAX_BITES ? '🌰' : '🍎'}
            </div>
          </motion.button>

          {/* Popups */}
          <AnimatePresence>
            {popups.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: -30, scale: 1 }}
                exit={{ opacity: 0, y: -60, scale: 0.98 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute top-1/2 left-1/2 pointer-events-none whitespace-nowrap"
                style={{ transform: `translate(calc(-50% + ${p.x}px), calc(-50% - 40px + ${p.y}px))` }}
              >
                <div className="glass-card rounded-full px-4 py-1 text-sm font-semibold text-yellow-200/95 border-white/25">
                  {p.word} +1
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-7">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-300 via-pink-300 to-yellow-200"
              style={{ width: `${Math.min(100, (bites / MAX_BITES) * 100)}%`, transition: 'width 220ms ease' }}
            />
          </div>
          <div className="mt-2 text-xs text-white/60 tracking-widest">
            {bites < MAX_BITES ? `还差 ${MAX_BITES - bites} 口` : '果核在发光…'}
          </div>
        </div>

        {bites >= MAX_BITES && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-yellow-200/90"
          >
            剩下了一颗神奇的种子，继续吧 →
          </motion.div>
        )}
      </div>
    </div>
  );
}

