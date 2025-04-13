
import React from 'react';
import { Twitter, Github, MessagesSquare, Flame } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-infernal-darkest border-t border-infernal-crimson/20 py-12">
      {/* Flickering flame background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-2 bg-infernal-ember rounded-full blur-sm animate-flicker"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
              opacity: 0.5 + Math.random() * 0.5
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <Flame size={24} className="text-infernal-crimson animate-pulse-glow" />
            <h3 className="font-demonic text-white text-3xl">SkyAnime</h3>
            <Flame size={24} className="text-infernal-crimson animate-pulse-glow" />
          </div>
          
          <p className="font-ritual text-white/70 max-w-lg mx-auto text-lg italic">
            "In the beginning, there was ink. Then came fire. Now… SkyAnime."
          </p>
        </div>
        
        <div className="flex justify-center space-x-6 mb-8">
          {/* Social icons inside demonic glyphs */}
          <a href="#" className="relative group">
            <div className="absolute inset-0 pentagram-bg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative p-3 text-white/70 hover:text-infernal-crimson transition-colors duration-300">
              <Twitter size={20} />
            </div>
          </a>
          
          <a href="#" className="relative group">
            <div className="absolute inset-0 pentagram-bg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative p-3 text-white/70 hover:text-infernal-crimson transition-colors duration-300">
              <MessagesSquare size={20} />
            </div>
          </a>
          
          <a href="#" className="relative group">
            <div className="absolute inset-0 pentagram-bg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative p-3 text-white/70 hover:text-infernal-crimson transition-colors duration-300">
              <Github size={20} />
            </div>
          </a>
        </div>
        
        <div className="text-center text-white/50 text-sm">
          <p>© 2025 SkyAnime. All rights reserved to the darkness.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
