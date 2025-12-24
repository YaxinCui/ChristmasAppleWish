import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function SceneWish({ onSubmit }) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const suggestions = useMemo(
    () => [
      '身体健康，平安喜乐',
      '升职加薪，工作顺利',
      '找到对象，甜甜恋爱',
      '学会一项新技能',
      '和喜欢的人去旅行',
      '家人朋友都幸福',
    ],
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      // 尝试发送到本地服务
      await fetch('/api/wish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wish: text }),
      });
    } catch (err) {
      console.log('Backend not available, proceeding anyway');
    }

    // 提交瞬间的庆祝
    confetti({
      particleCount: 80,
      spread: 70,
      startVelocity: 25,
      scalar: 0.9,
      origin: { x: 0.5, y: 0.4 },
      colors: ['#f472b6', '#a78bfa', '#fbbf24', '#34d399', '#ffffff'],
    });

    // 无论成功与否，都进入下一幕
    onSubmit(text);
    setIsSubmitting(false);
  };

  return (
    <div className="w-full">
      <div className="glass-card glow rounded-3xl px-6 py-6 w-full">
        <div className="mb-3 flex justify-center text-6xl">💌</div>
        <h2 className="text-xl font-display tracking-wide text-center mb-1 text-pink-100">
          许下一个新年愿望
        </h2>
        <p className="text-center text-sm text-white/70 mb-5">
          你的愿望会被悄悄记录下来，变成树上最亮的一颗星
        </p>

        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setText((prev) => (prev ? prev : s))}
              className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-white/80 hover:bg-white/15 transition"
            >
              {s}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="明年我想..."
              className="w-full h-36 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400/70 resize-none text-base leading-relaxed"
              autoFocus
              maxLength={140}
            />
            <div className="absolute bottom-3 right-3 text-[11px] text-white/45 tracking-wider">
              {text.length}/140
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={!text.trim() || isSubmitting}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl font-bold text-white shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? '发送中...' : '封存愿望 ✨'}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
