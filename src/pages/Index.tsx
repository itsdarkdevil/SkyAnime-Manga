
import React, { useState, useEffect } from 'react';
import AnimatedRune from '@/components/AnimatedRune';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MangaCard from '@/components/MangaCard';
import GenreOrbs from '@/components/GenreOrbs';
import RitualSearch from '@/components/RitualSearch';
import TrendingManga from '@/components/TrendingManga';
import Footer from '@/components/Footer';
import { getDefaultManga, searchManga } from '@/services/MangaService';
import { Manga } from '@/types/mangaTypes';
import { Skull, Flame, BookOpen } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [featuredManga, setFeaturedManga] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Manga[]>([]);
  const { toast } = useToast();

  const genres = [
    "Horror", "Tragedy", "Thriller", "Action", 
    "Dark Fantasy", "Forbidden Romance", "Supernatural", 
    "Mystery", "Psychological"
  ];

  useEffect(() => {
    // Load default manga for demo
    const loadManga = async () => {
      try {
        const manga = getDefaultManga();
        setFeaturedManga(manga);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading manga:', error);
        setIsLoading(false);
        toast({
          title: "Failed to load manga",
          description: "The forbidden archives are currently sealed.",
          variant: "destructive"
        });
      }
    };

    loadManga();
  }, [toast]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const results = await searchManga(query);
      setSearchResults(results);
      
      if (results.length === 0) {
        toast({
          title: "No results found",
          description: "Even the darkness couldn't find what you seek.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Rituals complete",
          description: `Found ${results.length} forbidden texts.`,
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: "The ritual was interrupted. Try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenreClick = async (genre: string) => {
    setIsLoading(true);
    try {
      const results = await searchManga(genre);
      setSearchResults(results);
      
      toast({
        title: genre,
        description: `${results.length} occult texts found in this genre.`,
      });
    } catch (error) {
      console.error('Genre search error:', error);
      toast({
        title: "Failed to search genre",
        description: "The ritual was interrupted. Try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-infernal-black overflow-x-hidden">
      {showIntro && <AnimatedRune onComplete={() => setShowIntro(false)} />}
      
      <Header />
      
      <main>
        <HeroSection />
        
        {/* Featured Manga Section */}
        <section id="manga-vault" className="py-16 container mx-auto px-4">
          <div className="flex items-center mb-10">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-infernal-crimson/30 to-transparent"></div>
            <h2 className="font-demonic text-3xl text-white mx-6 flex items-center">
              <BookOpen size={24} className="text-infernal-crimson mr-2" />
              Grimoire Showcase
            </h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-infernal-crimson/30 to-transparent"></div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-infernal-darkest aspect-[3/4] animate-pulse rounded-md"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {featuredManga.map((manga) => (
                <MangaCard 
                  key={manga.id}
                  id={manga.id}
                  title={manga.title}
                  coverImage={manga.coverImage}
                  genres={manga.genres}
                />
              ))}
            </div>
          )}
        </section>
        
        {/* Trending Manga Section */}
        <TrendingManga />
        
        {/* Genres Section */}
        <section id="dark-genres" className="py-16 bg-infernal-black">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-10">
              <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-infernal-crimson/30 to-transparent"></div>
              <h2 className="font-demonic text-3xl text-white mx-6 flex items-center">
                <Skull size={24} className="text-infernal-crimson mr-2" />
                From the Abyss
              </h2>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-infernal-crimson/30 to-transparent"></div>
            </div>
            
            <GenreOrbs genres={genres} onGenreClick={handleGenreClick} />
          </div>
        </section>
        
        {/* Search Section */}
        <section id="search" className="py-16 container mx-auto px-4">
          <div className="flex items-center mb-10">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-infernal-crimson/30 to-transparent"></div>
            <h2 className="font-demonic text-3xl text-white mx-6 flex items-center">
              <Flame size={24} className="text-infernal-crimson mr-2" />
              Ritual Search
            </h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-infernal-crimson/30 to-transparent"></div>
          </div>
          
          <RitualSearch onSearch={handleSearch} />
          
          {searchResults.length > 0 && (
            <div className="mt-10">
              <h3 className="text-white font-ritual text-xl mb-6">Search Results</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {searchResults.map((manga) => (
                  <MangaCard 
                    key={manga.id}
                    id={manga.id}
                    title={manga.title}
                    coverImage={manga.coverImage}
                    genres={manga.genres}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
