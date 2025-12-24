import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function ChristmasTree({ blessings = [] }) {
  // 生成更自然的锯齿状松针路径
  const createLayerPath = (width, height, y) => {
    // 模拟不规则的松树边缘
    const steps = 8; // 每一边的锯齿数
    const leftPath = [];
    const rightPath = [];
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      // 更加自然的弧度
      const xOffset = (width / 2) * (1 - t) * (0.8 + Math.random() * 0.4); 
      const yOffset = y - height * t + (Math.random() * 5);
      
      leftPath.push(`L${160 - xOffset} ${yOffset}`);
      rightPath.unshift(`L${160 + xOffset} ${yOffset}`);
    }
    
    return `M160 ${y - height} ${leftPath.join(' ')} L160 ${y + 10} ${rightPath.join(' ')} Z`;
  };

  const treeLayers = useMemo(() => {
    return [
      { width: 220, height: 120, y: 340, color: ['#166534', '#15803d'] }, // 底层
      { width: 190, height: 110, y: 270, color: ['#15803d', '#16a34a'] },
      { width: 160, height: 100, y: 210, color: ['#16a34a', '#22c55e'] },
      { width: 130, height: 90, y: 160, color: ['#22c55e', '#4ade80'] }, // 顶层
    ];
  }, []);

  // 装饰球分布（确保在树体内）
  const ornaments = useMemo(() => {
    const points = [
      { x: 140, y: 310 }, { x: 180, y: 320 }, { x: 160, y: 290 },
      { x: 130, y: 250 }, { x: 190, y: 260 }, { x: 150, y: 230 },
      { x: 170, y: 200 }, { x: 145, y: 180 }, { x: 160, y: 150 },
    ];
    return points.map((p, i) => ({
      ...p,
      color: ['#f472b6', '#fbbf24', '#60a5fa', '#f87171'][i % 4],
      delay: i * 0.15,
      scale: 0.8 + Math.random() * 0.4
    }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-[320px] h-[420px] mx-auto select-none"
    >
      <svg viewBox="0 0 320 420" className="w-full h-full drop-shadow-2xl">
        <defs>
          <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="ornament-shine" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 树干 */}
        <rect x="145" y="330" width="30" height="50" rx="4" fill="#5D4037" />
        
        {/* 树层（这次用简单的贝塞尔曲线堆叠，模仿 Cartoon 3D 风格） */}
        <g filter="drop-shadow(0px 10px 10px rgba(0,0,0,0.3))">
            {/* Layer 4 (Bottom) */}
            <path d="M160 180 Q60 340 30 350 L290 350 Q260 340 160 180 Z" fill="#14532d" />
            <path d="M160 180 Q60 340 30 350 L290 350 Q260 340 160 180 Z" fill="url(#layerGrad4)" opacity="0.6" />
            
            {/* Layer 3 */}
            <path d="M160 130 Q70 270 50 280 L270 280 Q250 270 160 130 Z" fill="#15803d" />
            
            {/* Layer 2 */}
            <path d="M160 90 Q80 210 70 220 L250 220 Q240 210 160 90 Z" fill="#16a34a" />

            {/* Layer 1 (Top) */}
            <path d="M160 50 Q90 150 85 160 L235 160 Q230 150 160 50 Z" fill="#22c55e" />
        </g>

        {/* 覆盖一层简单的“积雪”效果（可选） */}
        <path d="M160 50 Q90 150 85 160 Q160 150 235 160 Q230 150 160 50 Z" fill="white" opacity="0.15" />

        {/* 修正后的高质感树体：使用圆锥体堆叠法，这是最经典的圣诞树画法 */}
        <g>
           {/* 重画：使用经典的三层圆锥结构，带圆角，看起来像 3D 模型 */}
           {/* Bottom Cone */}
           <path d="M160 120 L260 340 Q160 370 60 340 Z" fill="#15803d" />
           <path d="M60 340 Q160 370 260 340" fill="none" stroke="#0f5132" strokeWidth="2" opacity="0.3" />
           
           {/* Middle Cone */}
           <path d="M160 80 L240 260 Q160 285 80 260 Z" fill="#16a34a" />
           
           {/* Top Cone */}
           <path d="M160 40 L220 180 Q160 200 100 180 Z" fill="#22c55e" />
        </g>

        {/* 装饰球 */}
        {ornaments.map((o, i) => (
            <motion.g 
                key={i} 
                initial={{ scale: 0 }}
                animate={{ scale: o.scale }}
                transition={{ delay: 0.5 + o.delay, type: 'spring' }}
            >
                <circle cx={o.x} cy={o.y} r="8" fill={o.color} />
                {/* 装饰球高光，增加立体感 */}
                <circle cx={o.x - 2} cy={o.y - 2} r="3" fill="url(#ornament-shine)" />
                <circle cx={o.x} cy={o.y} r="8" fill="black" opacity="0.1" style={{ mixBlendMode: 'overlay' }} />
            </motion.g>
        ))}

        {/* 星星 */}
        <motion.g
             animate={{ rotate: [0, 5, -5, 0] }}
             transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
             style={{ originX: '160px', originY: '40px' }}
        >
            <path d="M160 15 L170 35 L195 38 L175 52 L180 75 L160 62 L140 75 L145 52 L125 38 L150 35 Z" 
                fill="#fbbf24" 
                stroke="#f59e0b" 
                strokeWidth="2" 
                filter="drop-shadow(0 0 10px gold)"
            />
        </motion.g>

        {/* 彩带 (Garland) */}
        <path d="M110 160 Q160 190 210 140" fill="none" stroke="#fcd34d" strokeWidth="3" strokeDasharray="5,5" opacity="0.8" />
        <path d="M90 240 Q160 280 230 220" fill="none" stroke="#fcd34d" strokeWidth="3" strokeDasharray="5,5" opacity="0.8" />

      </svg>
    </motion.div>
  );
}
