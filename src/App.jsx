import React, { useState } from 'react';
import SceneGift from './components/SceneGift';
import SceneApple from './components/SceneApple';
import SceneSeed from './components/SceneSeed';
import SceneTree from './components/SceneTree';
import SceneWish from './components/SceneWish';
import SceneFinale from './components/SceneFinale';
import Snowfall from './components/Snowfall';
import BGMPlayer from './components/BGMPlayer';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [stage, setStage] = useState('GIFT');
  const [wish, setWish] = useState('');
  const [blessings, setBlessings] = useState([]); // 来自“吃苹果”的祝福词，作为后续成长能量

  const renderScene = () => {
    switch(stage) {
      case 'GIFT': return <SceneGift onNext={() => setStage('APPLE')} />;
      case 'APPLE': return (
        <SceneApple
          onNext={(collectedBlessings) => {
            setBlessings(Array.isArray(collectedBlessings) ? collectedBlessings : []);
            setStage('SEED');
          }}
        />
      );
      case 'SEED': return <SceneSeed blessings={blessings} onNext={() => setStage('TREE')} />;
      case 'TREE': return <SceneTree blessings={blessings} onNext={() => setStage('WISH')} />;
      case 'WISH': return <SceneWish onSubmit={(w) => { setWish(w); setStage('FINALE'); }} />;
      case 'FINALE': return <SceneFinale wish={wish} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-purple-950 to-slate-950 text-white overflow-hidden relative font-sans selection:bg-pink-500 selection:text-white">
      <Snowfall />
      <BGMPlayer />
      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 w-full max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            {renderScene()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
