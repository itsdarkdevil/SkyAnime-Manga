
import React, { useState, useEffect } from 'react';
import { getTrendingManga } from '@/services/MangaService';
import { Manga } from '@/types/mangaTypes';
import MangaCard from './MangaCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Flame } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const TrendingManga: React.FC = () => {
  const [trendingManga, setTrendingManga] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadTrendingManga = async () => {
      try {
        setIsLoading(true);
        const manga = await getTrendingManga();
        setTrendingManga(manga);
      } catch (error) {
        console.error('Error loading trending manga:', error);
        toast({
          title: "Failed to load trending manga",
          description: "The dark forces have sealed away these titles temporarily.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTrendingManga();
  }, [toast]);

  return (
    <section className="py-16 bg-infernal-voidGray">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-10">
          <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-infernal-crimson/30 to-transparent"></div>
          <h2 className="font-demonic text-3xl text-white mx-6 flex items-center">
            <Flame size={24} className="text-infernal-crimson mr-2" />
            Trending in the Abyss
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
          <Carousel className="w-full">
            <CarouselContent className="-ml-1">
              {trendingManga.map((manga) => (
                <CarouselItem key={manga.id} className="pl-1 md:basis-1/3 lg:basis-1/5">
                  <div className="p-1">
                    <MangaCard
                      id={manga.id}
                      title={manga.title}
                      coverImage={manga.coverImage}
                      genres={manga.genres}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-infernal-black/50 hover:bg-infernal-crimson/50 border-infernal-crimson/30" />
            <CarouselNext className="right-2 bg-infernal-black/50 hover:bg-infernal-crimson/50 border-infernal-crimson/30" />
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default TrendingManga;
