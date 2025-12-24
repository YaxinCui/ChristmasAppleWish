import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ChristmasTree from './ChristmasTree';

export default function SceneTree({ onNext, blessings = [] }) {
  const [showButton, setShowButton] = useState(false);
  const ornaments = useMemo(() => {
    const arr = Array.isArray(blessings) ? blessings : [];
    return arr.slice(-3);
  }, [blessings]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="glass-card glow rounded-3xl px-6 py-5 w-full text-center">
        <h2 className="text-2xl font-display tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-green-200">
          圣诞树长大了
        </h2>
        <p className="mt-1 text-sm text-white/70">树顶的星星亮了起来…</p>

        <div className="relative mt-8 mb-2">
          <ChristmasTree blessings={blessings} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-5 text-white/70 text-sm"
        >
          你注入的祝福正在发光{ornaments.length ? `：${ornaments.join(' · ')}` : '…'}
        </motion.div>

        {showButton && (
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-7 w-full py-3 rounded-2xl glass-card border-white/25 hover:bg-white/15 transition-all"
          >
            <span className="font-semibold tracking-wide">打开树下的礼物</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}

