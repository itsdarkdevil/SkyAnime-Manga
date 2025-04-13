
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface RitualSearchProps {
  onSearch: (query: string) => void;
}

const RitualSearch: React.FC<RitualSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div 
        className={`relative transition-all duration-500 ${
          isFocused ? 'scale-105' : 'scale-100'
        }`}
      >
        {/* Background ritual circle */}
        <div 
          className={`absolute inset-0 pentagram-bg opacity-10 rounded-full transition-all duration-500 ${
            isFocused ? 'animate-slow-spin opacity-30' : ''
          }`}
        ></div>
        
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search the forbidden archives..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="ritual-search pr-10 font-ritual tracking-wide"
            />
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-infernal-crimson transition-colors duration-300"
            >
              <Search size={18} />
            </button>
          </div>
          
          {/* Shadow trail effect */}
          {query && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <p 
                className="font-ritual tracking-wide opacity-0 text-infernal-crimson"
                style={{
                  position: 'absolute', 
                  top: '50%',
                  left: '16px',
                  transform: 'translateY(-50%)',
                  WebkitTextStroke: '0.2px rgba(220, 20, 60, 0.3)',
                  animation: 'fadeout 1s forwards'
                }}
              >
                {query}
              </p>
            </div>
          )}
        </form>
      </div>
      
      <style>
        {`
        @keyframes fadeout {
          0% { opacity: 0.3; transform: translateY(-50%) translateX(0); }
          100% { opacity: 0; transform: translateY(-50%) translateX(20px); }
        }
        `}
      </style>
    </div>
  );
};

export default RitualSearch;
