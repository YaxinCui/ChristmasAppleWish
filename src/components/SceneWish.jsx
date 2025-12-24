import React, { useState } from 'react';

export default function SceneWish({ onSubmit }) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // 无论成功与否，都进入下一幕
    onSubmit(text);
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-sm animate-fade-in">
      <div className="mb-6 flex justify-center text-6xl">
        💌
      </div>
      <h2 className="text-xl font-bold text-center mb-6 text-pink-200">
        许下一个新年愿望
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="明年我想..."
          className="w-full h-32 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none text-lg"
          autoFocus
        />
        <button
          type="submit"
          disabled={!text.trim() || isSubmitting}
          className="py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full font-bold text-white shadow-lg hover:shadow-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
        >
          {isSubmitting ? '发送中...' : '发送愿望'}
        </button>
      </form>
    </div>
  );
}
