
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedRuneProps {
  onComplete: () => void;
}

const AnimatedRune: React.FC<AnimatedRuneProps> = ({ onComplete }) => {
  const [animationStage, setAnimationStage] = useState<'initial' | 'text' | 'burst' | 'complete'>('initial');
  const [text, setText] = useState('');
  const fullText = "You have entered SkyAnime… the forbidden archive of legends.";
  
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationStage('text');
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setText(fullText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setAnimationStage('burst');
            setTimeout(() => {
              setAnimationStage('complete');
              onComplete();
            }, 1000);
          }, 500);
        }
      }, 50);
    }, 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, [onComplete]);

  if (animationStage === 'complete') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000" 
         style={{ opacity: animationStage === 'burst' ? 0 : 1 }}>
      <div className="relative flex flex-col items-center justify-center">
        <div 
          className={cn(
            "w-64 h-64 rounded-full border-4 border-infernal-crimson transition-all duration-1000",
            animationStage === 'initial' ? "scale-0 opacity-0" : "scale-100 opacity-100",
            animationStage === 'burst' ? "scale-150 opacity-0" : ""
          )}
        >
          <div className="absolute inset-0 rounded-full bg-infernal-black overflow-hidden">
            <div className="absolute inset-0 pentagram-bg animate-slow-spin opacity-80"></div>
            <div className="absolute inset-2 rounded-full border border-infernal-crimson/30 animate-slow-spin-reverse"></div>
            <div className="absolute inset-4 rounded-full border border-infernal-crimson/20"></div>
            <div className="absolute inset-0 bg-infernal-crimson/10 animate-pulse-glow"></div>
          </div>
        </div>
        
        <div className="mt-8 text-center max-w-md">
          <p className="text-white/90 font-ritual text-xl tracking-wide">
            {text}
            <span className="cursor-animated"></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimatedRune;
