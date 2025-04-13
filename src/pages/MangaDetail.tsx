
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Star, Clock, BookOpen, AlertCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { getMangaByTitle, getAllChapters } from '@/services/MangaService';
import { Manga, Chapter } from '@/types/mangaTypes';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const MangaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [manga, setManga] = useState<Manga | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mangaDexId, setMangaDexId] = useState<string | null>(null);
  const [chaptersLoading, setChaptersLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchManga = async () => {
      try {
        // Find manga from your existing array based on ID
        const demoManga = [
          {
            id: "1",
            title: "Berserk",
            coverImage: "https://media.kitsu.io/manga/poster_images/berserk.jpg",
            synopsis: "His name is Guts, the Black Swordsman, a feared warrior spoken of only in whispers. Bearer of a gigantic sword, an iron hand, and the scars of countless battles and tortures, his flesh is also indelibly marked with The Brand, an unholy symbol that draws the forces of darkness to him and dooms him as their sacrifice. But Guts won't take his fate lying down; he'll cut a crimson swath of carnage through the ranks of the damned—and anyone else foolish enough to oppose him! Accompanied by Puck the Elf, more an annoyance than a companion, Guts relentlessly follows a dark, bloodstained path that leads only to death...or vengeance.",
            genres: ["Horror", "Action", "Fantasy", "Supernatural", "Drama"],
            status: "ongoing",
            startDate: "1989-08-25",
            rating: "86.12",
            subtype: "manga"
          },
          {
            id: "2",
            title: "Hellsing",
            coverImage: "https://media.kitsu.io/manga/poster_images/hellsing.jpg",
            synopsis: "Hellsing follows the antiheroic vampire Alucard and a police girl-turned-vampire named Seras Victoria on their missions to protect England from vampires, ghouls, and other supernatural threats. The manga also focuses on the aristocratic Hellsing family, who are the leaders of an organization responsible for combating supernatural threats, and the Vatican-supervised Iscariot Organization.",
            genres: ["Horror", "Supernatural", "Action", "Vampire"],
            status: "finished",
            startDate: "1997-05-01",
            endDate: "2008-09-30",
            rating: "82.5",
            subtype: "manga"
          },
          {
            id: "3",
            title: "Tokyo Ghoul",
            coverImage: "https://media.kitsu.io/manga/poster_images/tokyo_ghoul.jpg",
            synopsis: "Shy Ken Kaneki is thrilled to go on a date with the beautiful Rize. But it turns out that she's only interested in his body—eating it, that is. When a morally questionable rescue transforms him into the first half-human half-Ghoul hybrid, Ken is drawn into the dark and violent world of Ghouls, which exists alongside our own.",
            genres: ["Horror", "Supernatural", "Psychological", "Drama"],
            status: "finished",
            startDate: "2011-09-08",
            endDate: "2014-09-18",
            rating: "84.2",
            subtype: "manga"
          },
          {
            id: "4",
            title: "Chainsaw Man",
            coverImage: "https://media.kitsu.io/manga/poster_images/chainsaw_man.jpg",
            synopsis: "Denji has a simple dream—to live a happy and peaceful life, spending time with a girl he likes. This is a far cry from reality, however, as Denji is forced by the yakuza into killing devils in order to pay off his crushing debts. Using his pet devil Pochita as a weapon, he is ready to do anything for a bit of cash.",
            genres: ["Action", "Supernatural", "Horror", "Comedy"],
            status: "ongoing",
            startDate: "2018-12-03",
            rating: "88.4",
            subtype: "manga"
          },
          {
            id: "5",
            title: "Jujutsu Kaisen",
            coverImage: "https://media.kitsu.io/manga/poster_images/jujutsu_kaisen.jpg",
            synopsis: "Yuji Itadori is a boy with tremendous physical strength, though he lives a completely ordinary high school life. One day, to save a classmate who has been attacked by curses, he eats the finger of Ryomen Sukuna, taking the curse into his own soul. From then on, he shares one body with Ryomen Sukuna. Guided by the most powerful of sorcerers, Satoru Gojo, Itadori is admitted to Tokyo Jujutsu High School, an organization that fights the curses... and thus begins the heroic tale of a boy who became a curse to exorcise a curse, a life from which he could never turn back.",
            genres: ["Supernatural", "Action", "Horror", "School Life"],
            status: "ongoing",
            startDate: "2018-03-05",
            rating: "87.9",
            subtype: "manga"
          },
          {
            id: "6",
            title: "Gantz",
            coverImage: "https://media.kitsu.io/manga/poster_images/gantz.jpg",
            synopsis: "After trying to save someone from getting hit by a train, high school students Kei Kurono and Masaru Kato find themselves trapped in a twisted game of death, where they're forced to hunt down and kill aliens. Equipped with high-tech suits and weapons, they must survive this brutal test or face permanent death.",
            genres: ["Sci-Fi", "Action", "Horror", "Mature"],
            status: "finished",
            startDate: "2000-07-13",
            endDate: "2013-06-20",
            rating: "80.3",
            subtype: "manga"
          }
        ].find(m => m.id === id);
        
        if (demoManga) {
          setManga(demoManga);
          
          // Try to get MangaDex ID for this manga
          const mdId = await getMangaByTitle(demoManga.title);
          if (mdId) {
            setMangaDexId(mdId);
            // Auto-load chapters if we have a MangaDex ID
            loadChapters(mdId);
          } else {
            toast({
              title: "Manga identification failed",
              description: "Could not find this manga in MangaDex.",
              variant: "destructive"
            });
          }
        } else {
          toast({
            title: "Manga not found",
            description: "The requested manga does not exist in our archives.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error fetching manga details:', error);
        toast({
          title: "Failed to load manga",
          description: "The forbidden text could not be retrieved.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchManga();
  }, [id, toast]);

  const loadChapters = async (mdId: string = '') => {
    const mangaId = mdId || mangaDexId;
    
    if (!mangaId) {
      toast({
        title: "Chapters unavailable",
        description: "This forbidden text's chapters cannot be found in the archives.",
        variant: "destructive"
      });
      return;
    }
    
    setChaptersLoading(true);
    
    try {
      const allChapters = await getAllChapters(mangaId);
      setChapters(allChapters);
      
      if (allChapters.length === 0) {
        toast({
          title: "No chapters found",
          description: "The archives contain no readable chapters for this text.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Chapters retrieved",
          description: `${allChapters.length} chapters found in the archives.`
        });
      }
    } catch (error) {
      console.error('Error loading chapters:', error);
      toast({
        title: "Failed to load chapters",
        description: "The ritual to retrieve chapters was interrupted.",
        variant: "destructive"
      });
    } finally {
      setChaptersLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-infernal-black">
        <Header />
        <main className="pt-24 pb-16 container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <Skeleton className="h-[400px] w-[280px] bg-infernal-darkest" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-10 w-3/4 bg-infernal-darkest" />
              <Skeleton className="h-6 w-1/3 bg-infernal-darkest" />
              <Skeleton className="h-32 w-full bg-infernal-darkest" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20 bg-infernal-darkest" />
                <Skeleton className="h-8 w-20 bg-infernal-darkest" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!manga) {
    return (
      <div className="min-h-screen bg-infernal-black">
        <Header />
        <main className="pt-24 pb-16 container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <AlertCircle size={64} className="mx-auto text-infernal-crimson mb-4" />
            <h1 className="font-demonic text-3xl text-white mb-4">Manga Not Found</h1>
            <p className="text-white/70 mb-6">This forbidden text does not exist in our archives or has been sealed away.</p>
            <Link to="/" className="ritual-button inline-block">
              Return to the Archives
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-infernal-black">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back navigation */}
          <Link 
            to="/" 
            className="inline-flex items-center text-white/70 hover:text-white mb-8 group transition-colors"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Archives</span>
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Manga cover */}
            <div className="w-full md:w-64 lg:w-80 flex-shrink-0">
              <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-infernal-ash/30 bg-infernal-darkest">
                <div className="absolute inset-0 pentagram-bg opacity-10"></div>
                <img 
                  src={manga.coverImage} 
                  alt={manga.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Action buttons */}
              <div className="mt-4 space-y-2">
                <button 
                  onClick={() => loadChapters()}
                  disabled={chaptersLoading}
                  className="ritual-button w-full flex items-center justify-center"
                >
                  {chaptersLoading ? (
                    <span className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Summoning...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <BookOpen size={18} className="mr-2" />
                      Read Chapters
                    </span>
                  )}
                </button>
              </div>
            </div>
            
            {/* Manga details */}
            <div className="flex-1">
              <h1 className="font-demonic text-3xl md:text-4xl text-white mb-2">{manga.title}</h1>
              
              {/* Status and metadata */}
              <div className="flex flex-wrap gap-4 mb-6">
                {manga.status && (
                  <div className="px-3 py-1 bg-infernal-crimson/20 border border-infernal-crimson/30 rounded text-white/90 text-sm flex items-center">
                    <Star size={16} className="mr-1" />
                    {manga.status.charAt(0).toUpperCase() + manga.status.slice(1)}
                  </div>
                )}
                
                {manga.startDate && (
                  <div className="px-3 py-1 bg-infernal-purple/20 border border-infernal-purple/30 rounded text-white/90 text-sm flex items-center">
                    <Clock size={16} className="mr-1" />
                    {new Date(manga.startDate).getFullYear()}
                    {manga.endDate && ` - ${new Date(manga.endDate).getFullYear()}`}
                  </div>
                )}
                
                {manga.rating && (
                  <div className="px-3 py-1 bg-infernal-ember/20 border border-infernal-ember/30 rounded text-white/90 text-sm flex items-center">
                    <Star size={16} className="mr-1" />
                    {manga.rating}
                  </div>
                )}
              </div>
              
              {/* Genres */}
              {manga.genres && manga.genres.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white/90 font-ritual mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {manga.genres.map((genre, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-infernal-voidGray border border-infernal-ash/30 rounded-full text-white/80 text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Synopsis */}
              {manga.synopsis && (
                <div className="mb-6">
                  <h3 className="text-white/90 font-ritual mb-2">Synopsis</h3>
                  <p className="text-white/70 font-gothic leading-relaxed">
                    {manga.synopsis}
                  </p>
                </div>
              )}
              
              {/* Chapter list */}
              {chapters.length > 0 && (
                <div className="mt-8">
                  <Separator className="bg-infernal-crimson/30 mb-4" />
                  <h3 className="text-white/90 font-ritual text-xl mb-4 flex items-center">
                    <BookOpen className="mr-2 text-infernal-crimson" size={20} />
                    Chapters
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {chapters.slice(0, 12).map((chapter) => (
                      <Link 
                        key={chapter.id}
                        to={`/reader/${chapter.id}`}
                        className="flex items-center bg-infernal-darkest p-3 border border-infernal-ash/30 rounded-md hover:border-infernal-crimson/50 transition-colors group"
                      >
                        <div className="mr-3 bg-infernal-crimson/20 text-white font-ritual h-8 w-8 flex items-center justify-center rounded-full">
                          {chapter.chapter}
                        </div>
                        <div className="flex-1 truncate text-white/80 group-hover:text-white transition-colors">
                          {chapter.title}
                        </div>
                        <ChevronRight size={16} className="text-white/50 group-hover:text-infernal-crimson transition-colors" />
                      </Link>
                    ))}
                  </div>
                  
                  {chapters.length > 12 && (
                    <div className="text-center mt-4">
                      <Link 
                        to={`/chapters/${manga.id}`}
                        className="inline-flex items-center text-white/80 hover:text-infernal-crimson transition-colors"
                      >
                        View All {chapters.length} Chapters
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MangaDetail;
