import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function SceneSeed({ onNext, blessings = [] }) {
  const [progress, setProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const intervalRef = useRef(null);
  const pressStartRef = useRef(0);

  const startGrowing = (e) => {
    // Prevent default context menu or scrolling on long press
    if (e.cancelable && e.type === 'touchstart') e.preventDefault();
    setIsPressing(true);
    setHasStarted(true);
    pressStartRef.current = Date.now();
  };

  const stopGrowing = (e) => {
    if (e.cancelable && e.type === 'touchend') e.preventDefault();
    setIsPressing(false);
  };

  useEffect(() => {
    if (isPressing) {
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(intervalRef.current);
            onNext();
            return 100;
          }
          if (prev === 48 || prev === 68 || prev === 88) {
            try {
              if (navigator?.vibrate) navigator.vibrate(12);
            } catch (_) {}
          }
          const bonus = Math.min(3, Math.floor((blessings?.length || 0) / 2)); // 吃得越“有祝福”，长得越快
          return prev + 2 + bonus; // Speed of growth
        });
      }, 50);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPressing, onNext, blessings]);

  const topBlessings = useMemo(() => {
    const arr = Array.isArray(blessings) ? blessings : [];
    // 只展示前 6 个（太多会显乱）
    return arr.slice(-6);
  }, [blessings]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="glass-card glow rounded-3xl px-6 py-5 w-full text-center">
        <h2 className="text-xl text-green-100 font-display tracking-wide">把祝福注入种子</h2>
        <p className="mt-1 text-sm text-white/70">
          你刚才吃下的每一口“祝福”，都会变成圣诞树的养分
        </p>

        {/* 祝福展示 */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {(topBlessings.length ? topBlessings : ['平安', '健康', '好运']).map((w, idx) => (
            <span
              key={`${w}-${idx}`}
              className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-white/80"
            >
              {w}
            </span>
          ))}
        </div>
      
        <div className="mt-8 flex items-center justify-center">
          <div 
            className="relative w-56 h-56 flex items-center justify-center select-none cursor-pointer touch-none"
            onMouseDown={startGrowing}
            onMouseUp={stopGrowing}
            onMouseLeave={stopGrowing}
            onTouchStart={startGrowing}
            onTouchEnd={stopGrowing}
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* 外圈能量光晕 */}
            <motion.div
              animate={isPressing ? { opacity: 1, scale: [1, 1.02, 1] } : { opacity: 0.45, scale: 1 }}
              transition={{ duration: 1.2, repeat: isPressing ? Infinity : 0, ease: 'easeInOut' }}
              className="absolute inset-4 rounded-full"
              style={{
                background:
                  'conic-gradient(from 180deg, rgba(250,204,21,.0), rgba(250,204,21,.55), rgba(168,85,247,.55), rgba(34,197,94,.45), rgba(250,204,21,.0))',
                filter: 'blur(14px)',
              }}
            />

            {/* 环形进度 */}
            <svg className="absolute inset-0" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="76" stroke="rgba(255,255,255,.10)" strokeWidth="10" fill="none" />
              <circle
                cx="100"
                cy="100"
                r="76"
                stroke="rgba(250,204,21,.9)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={Math.PI * 2 * 76}
                strokeDashoffset={(1 - progress / 100) * (Math.PI * 2 * 76)}
                style={{ transition: 'stroke-dashoffset 80ms linear' }}
              />
            </svg>

            {/* 土壤 */}
            <div className="absolute bottom-10 w-40 h-10 bg-amber-900/50 rounded-full blur-[2px] border border-white/10" />

            {/* 种子/幼苗 */}
            <motion.div
              animate={
                isPressing
                  ? { y: [-1, 1, -1], rotate: [0, -1, 1, 0] }
                  : { y: 0, rotate: 0 }
              }
              transition={{ duration: 1.6, repeat: isPressing ? Infinity : 0, ease: 'easeInOut' }}
              className="text-[4.5rem] origin-bottom drop-shadow-2xl"
              style={{ transform: `scale(${1 + progress / 80}) translateY(${-progress * 0.65}px)` }}
            >
              {progress < 25 ? '🌰' : progress < 60 ? '🌱' : progress < 95 ? '🌿' : '✨'}
            </motion.div>

            {/* 祝福能量：围绕→吸入 */}
            {topBlessings.slice(0, 6).map((w, idx) => {
              const angle = (idx / Math.max(1, topBlessings.length)) * Math.PI * 2;
              const r = 86;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              return (
                <motion.div
                  key={`orb-${w}-${idx}`}
                  initial={{ opacity: 0, x, y, scale: 0.85 }}
                  animate={
                    isPressing
                      ? { opacity: 0.9, x: 0, y: 0, scale: 0.9 }
                      : { opacity: hasStarted ? 0.9 : 0.75, x, y, scale: 0.95 }
                  }
                  transition={{ duration: isPressing ? 0.5 : 0.8, ease: 'easeInOut' }}
                  className="absolute top-1/2 left-1/2"
                  style={{ transform: 'translate(-50%,-50%)' }}
                >
                  <div className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] text-white/85 backdrop-blur">
                    {w}
                  </div>
                </motion.div>
              );
            })}

            {/* 按住时的粒子点（加密一点，增强“正在注入”） */}
            {isPressing && progress < 100 && (
              <>
                <div className="absolute left-7 top-20 w-2 h-2 rounded-full bg-pink-300/80 animate-soft-pulse" />
                <div className="absolute right-10 top-24 w-1.5 h-1.5 rounded-full bg-yellow-200/80 animate-soft-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="absolute left-14 bottom-16 w-1.5 h-1.5 rounded-full bg-green-200/80 animate-soft-pulse" style={{ animationDelay: '0.4s' }} />
                <div className="absolute right-20 bottom-20 w-1.5 h-1.5 rounded-full bg-white/70 animate-soft-pulse" style={{ animationDelay: '0.6s' }} />
              </>
            )}
          </div>
        </div>

        <div className="mt-6">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-300 via-yellow-200 to-pink-300"
              style={{ width: `${progress}%`, transition: 'width 80ms linear' }}
            />
          </div>
          <div className="mt-2 text-xs text-white/60 tracking-widest">
            {progress < 100 ? `祝福能量 ${progress}%（长按将祝福“注入”种子）` : `完成！马上长成圣诞树…`}
          </div>
        </div>
      </div>
    </div>
  );
}

