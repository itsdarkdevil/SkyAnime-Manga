
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  BookOpen, 
  Skull, 
  Search, 
  Flame,
  Info
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-infernal-black/90 backdrop-blur-sm shadow-lg shadow-infernal-crimson/5' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="relative flex items-center">
          <div className="absolute inset-0 pentagram-bg animate-slow-spin opacity-30"></div>
          <Link to="/" className="font-demonic text-2xl md:text-3xl lg:text-4xl text-white relative">
            <span className="mr-1 animate-pulse-glow text-infernal-crimson">Sky</span>
            <span className="animate-flicker">Anime</span>
          </Link>
        </div>
        
        {isMobile ? (
          <button 
            className="text-white p-2 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-6 h-0.5 bg-white mb-1.5 transition-all duration-300" 
                 style={{transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'}}></div>
            <div className="w-6 h-0.5 bg-white mb-1.5 transition-all duration-300"
                 style={{opacity: menuOpen ? 0 : 1}}></div>
            <div className="w-6 h-0.5 bg-white transition-all duration-300"
                 style={{transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'}}></div>
          </button>
        ) : (
          <nav className="flex space-x-1">
            <Link to="/" className="nav-link blood-drip">
              <Home size={18} className="icon" /> Home
            </Link>
            <a href="#manga-vault" className="nav-link blood-drip">
              <BookOpen size={18} className="icon" /> Manga Vault
            </a>
            <a href="#dark-genres" className="nav-link blood-drip">
              <Skull size={18} className="icon" /> Dark Genres
            </a>
            <a href="#search" className="nav-link blood-drip">
              <Search size={18} className="icon" /> Cursed Search
            </a>
            <a href="#picks" className="nav-link blood-drip">
              <Flame size={18} className="icon" /> Demon's Picks
            </a>
            <Link to="/about" className="nav-link blood-drip">
              <Info size={18} className="icon" /> About
            </Link>
          </nav>
        )}
      </div>
      
      {/* Mobile menu */}
      {isMobile && (
        <div 
          className={`absolute w-full bg-infernal-darkest border-t border-infernal-crimson/20 shadow-lg transition-all duration-300 overflow-hidden ${
            menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col py-2">
            <Link to="/" className="nav-link py-3 px-6" onClick={() => setMenuOpen(false)}>
              <Home size={18} className="icon" /> Home
            </Link>
            <a href="#manga-vault" className="nav-link py-3 px-6" onClick={() => setMenuOpen(false)}>
              <BookOpen size={18} className="icon" /> Manga Vault
            </a>
            <a href="#dark-genres" className="nav-link py-3 px-6" onClick={() => setMenuOpen(false)}>
              <Skull size={18} className="icon" /> Dark Genres
            </a>
            <a href="#search" className="nav-link py-3 px-6" onClick={() => setMenuOpen(false)}>
              <Search size={18} className="icon" /> Cursed Search
            </a>
            <a href="#picks" className="nav-link py-3 px-6" onClick={() => setMenuOpen(false)}>
              <Flame size={18} className="icon" /> Demon's Picks
            </a>
            <Link to="/about" className="nav-link py-3 px-6" onClick={() => setMenuOpen(false)}>
              <Info size={18} className="icon" /> About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
