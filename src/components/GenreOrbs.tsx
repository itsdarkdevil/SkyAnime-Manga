
import React, { useState, useEffect } from 'react';

interface GenreOrbsProps {
  genres: string[];
}

const GenreOrbs: React.FC<GenreOrbsProps> = ({ genres }) => {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.1) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[300px] w-full max-w-[600px] mx-auto">
      {/* Center glowing orb */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-infernal-crimson rounded-full blur-sm animate-pulse-glow"></div>
      
      {/* Rotating genres */}
      {genres.map((genre, i) => {
        const angle = (i * (360 / genres.length) + rotation) % 360;
        const radius = 120; // Orbit radius
        
        // Calculate position
        const x = Math.cos(angle * (Math.PI / 180)) * radius;
        const y = Math.sin(angle * (Math.PI / 180)) * radius;
        
        // Calculate size based on position (perspective effect)
        const scale = 0.8 + 0.4 * (y + radius) / (radius * 2);
        const zIndex = Math.floor((y + radius) / 10);
        
        return (
          <div
            key={i}
            className="genre-orb absolute transition-shadow duration-300"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              zIndex,
              opacity: 0.7 + 0.3 * scale
            }}
            onMouseEnter={() => {
              // Play whisper sound (would be implemented with actual audio in a full project)
              console.log(`Whisper sound for ${genre}`);
            }}
          >
            {genre}
          </div>
        );
      })}
      
      {/* Center connecting lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.2 }}>
        {genres.map((_, i) => {
          const angle = (i * (360 / genres.length) + rotation) % 360;
          const radius = 120;
          
          const x = Math.cos(angle * (Math.PI / 180)) * radius + 300;
          const y = Math.sin(angle * (Math.PI / 180)) * radius + 150;
          
          return (
            <line
              key={i}
              x1="300"
              y1="150"
              x2={x}
              y2={y}
              stroke="#800000"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default GenreOrbs;
