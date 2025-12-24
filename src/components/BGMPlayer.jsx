import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function BGMPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const [userInteracted, setUserInteracted] = useState(false);

  // 尝试播放
  const tryPlay = () => {
    if (audioRef.current && !playing) {
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch(e => console.log("Autoplay prevented:", e));
    }
  };

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  // 监听首次点击以解锁自动播放
  useEffect(() => {
    const handleInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        tryPlay();
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [userInteracted]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <audio
        ref={audioRef}
        loop
        src="/bgm.mp3" 
      />
      
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 shadow-lg"
      >
        {playing ? (
          <div className="flex gap-[3px] items-end h-4">
            <motion.div animate={{ height: [4, 12, 6, 16, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-[2px] bg-white rounded-full" />
            <motion.div animate={{ height: [8, 4, 16, 8, 8] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-[2px] bg-white rounded-full" />
            <motion.div animate={{ height: [12, 8, 4, 12, 12] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-[2px] bg-white rounded-full" />
            <motion.div animate={{ height: [4, 16, 8, 4, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-[2px] bg-white rounded-full" />
          </div>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
