import React, { useState } from 'react';
import SceneGift from './components/SceneGift';
import SceneApple from './components/SceneApple';
import SceneSeed from './components/SceneSeed';
import SceneTree from './components/SceneTree';
import SceneWish from './components/SceneWish';
import SceneFinale from './components/SceneFinale';

function App() {
  const [stage, setStage] = useState('GIFT'); // GIFT, APPLE, SEED, TREE, WISH, FINALE
  const [wish, setWish] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative font-sans">
      {/* Snowfall effect could go here */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none animate-pulse"></div>
      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 w-full max-w-md mx-auto text-center">
        {stage === 'GIFT' && <SceneGift onNext={() => setStage('APPLE')} />}
        {stage === 'APPLE' && <SceneApple onNext={() => setStage('SEED')} />}
        {stage === 'SEED' && <SceneSeed onNext={() => setStage('TREE')} />}
        {stage === 'TREE' && <SceneTree onNext={() => setStage('WISH')} />}
        {stage === 'WISH' && (
          <SceneWish 
            onSubmit={(userWish) => { 
              setWish(userWish); 
              setStage('FINALE'); 
            }} 
          />
        )}
        {stage === 'FINALE' && <SceneFinale wish={wish} />}
      </main>
    </div>
  );
}

export default App;
