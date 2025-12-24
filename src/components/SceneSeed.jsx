import React, { useState, useEffect, useRef } from 'react';

export default function SceneSeed({ onNext }) {
  const [progress, setProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const intervalRef = useRef(null);

  const startGrowing = (e) => {
    // Prevent default context menu or scrolling on long press
    if (e.cancelable && e.type === 'touchstart') e.preventDefault();
    setIsPressing(true);
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
          return prev + 2; // Speed of growth
        });
      }, 50);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPressing, onNext]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl mb-8 text-green-200">长按屏幕，注入念力</h2>
      
      <div 
        className="relative w-40 h-40 flex items-center justify-center select-none cursor-pointer touch-none"
        onMouseDown={startGrowing}
        onMouseUp={stopGrowing}
        onMouseLeave={stopGrowing}
        onTouchStart={startGrowing}
        onTouchEnd={stopGrowing}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Soil */}
        <div className="absolute bottom-0 w-32 h-8 bg-amber-900/60 rounded-full blur-sm"></div>
        
        {/* Seed/Plant */}
        <div className="text-6xl transition-all duration-300 transform origin-bottom"
          style={{ transform: `scale(${1 + progress / 50}) translateY(${-progress / 2}px)` }}
        >
          {progress < 30 ? '🌰' : progress < 70 ? '🌱' : '🌿'}
        </div>

        {/* Energy Ring */}
        {isPressing && progress < 100 && (
          <div className="absolute inset-0 border-4 border-yellow-400 rounded-full animate-ping opacity-50"></div>
        )}
      </div>

      <div className="w-64 h-2 bg-gray-700 rounded-full mt-12 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-400 to-yellow-300 transition-all duration-100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-xs text-gray-400">{progress}%</p>
    </div>
  );
}

