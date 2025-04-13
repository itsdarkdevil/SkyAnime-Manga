
import React, { useState } from 'react';
import { Eye, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface MangaCardProps {
  id: string;
  title: string;
  coverImage: string;
  genres?: string[];
}

const MangaCard: React.FC<MangaCardProps> = ({ id, title, coverImage, genres }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className={cn(
        "manga-card group transition-all duration-500",
        isLoaded ? "opacity-100" : "opacity-0"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Background sigil */}
        <div className="absolute inset-0 pentagram-bg opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
        
        {/* Manga cover */}
        <img 
          src={coverImage} 
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            "group-hover:scale-110"
          )}
          style={{ 
            filter: `brightness(${isHovered ? 0.7 : 0.9})` 
          }}
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Spectral hand effect on hover */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-infernal-black/80 via-transparent to-transparent",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            "transform translate-x-full group-hover:translate-x-0"
          )}
          style={{
            backgroundSize: '200% 100%',
            transition: 'all 1s ease-out'
          }}
        ></div>
        
        {/* Title and buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-infernal-black via-infernal-black/80 to-transparent">
          <h3 className="text-white font-ritual text-lg mb-2 truncate">{title}</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex -space-x-1">
              {genres && genres.slice(0, 3).map((genre, i) => (
                <span 
                  key={i}
                  className="text-xs px-2 py-0.5 bg-infernal-crimson/20 border border-infernal-crimson/30 rounded text-white/80"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <button className="text-white/70 hover:text-white p-1 transition-colors duration-300">
                <Eye size={16} />
              </button>
              <button className="text-white/70 hover:text-white p-1 transition-colors duration-300">
                <BookOpen size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Read button */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center bg-infernal-black/50 backdrop-blur-sm",
        "opacity-0 group-hover:opacity-100 transition-all duration-500"
      )}>
        <Link to={`/manga/${id}`} className="ritual-button text-sm scale-90 group-hover:scale-100">
          Read Now <span className="ml-1">&#8594;</span>
        </Link>
      </div>
    </div>
  );
};

export default MangaCard;
