
import React from 'react';
import { Flame } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-void-bg">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-infernal-crimson blur-md animate-float"
              style={{
                width: `${Math.random() * 20 + 5}px`,
                height: `${Math.random() * 20 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 5}s`
              }}
            />
          ))}
        </div>
        
        {/* Manga panels in background */}
        <div className="absolute inset-0 flex flex-wrap opacity-20">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="w-1/5 h-1/3 border border-white/5 transform rotate-3 transition-all duration-1000"
              style={{
                transformOrigin: 'center',
                transform: `rotate(${Math.random() * 20 - 10}deg) scale(${0.8 + Math.random() * 0.4})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                filter: 'grayscale(100%) brightness(30%)',
                opacity: 0.3 + Math.random() * 0.5
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-demonic text-white mb-6 animate-flicker">
          Read what was never meant to be read.
        </h2>
        
        <p className="text-xl md:text-2xl font-ritual text-white/80 mb-10 max-w-2xl mx-auto">
          SkyAnime - <span className="text-infernal-crimson">Forged in Flame</span>, Read with Fear.
        </p>
        
        <a href="#manga-vault" className="ritual-button group">
          <span className="relative z-10 flex items-center justify-center gap-2">
            Enter the Vault
            <Flame 
              size={20} 
              className="text-infernal-ember group-hover:animate-pulse-glow transition-all duration-300" 
            />
          </span>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
