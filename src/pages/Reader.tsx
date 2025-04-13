
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Home, X, Settings, Maximize, Minimize } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { getChapterPages } from '@/services/MangaService';

const Reader = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [pages, setPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadChapterPages = async () => {
      try {
        if (!chapterId) return;
        
        setIsLoading(true);
        const chapterPages = await getChapterPages(chapterId);
        
        if (chapterPages.length === 0) {
          toast({
            title: "No pages found",
            description: "This chapter has no readable pages.",
            variant: "destructive"
          });
        } else {
          setPages(chapterPages);
          toast({
            title: "Chapter loaded",
            description: `${chapterPages.length} pages retrieved from the archives.`,
          });
        }
      } catch (error) {
        console.error('Error loading chapter pages:', error);
        toast({
          title: "Failed to load chapter",
          description: "The arcane energies could not retrieve this chapter's pages.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadChapterPages();
  }, [chapterId, toast]);

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      toast({
        title: "End of chapter",
        description: "You've reached the final page of this chapter.",
      });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        toast({
          title: "Fullscreen error",
          description: `Error attempting to enable fullscreen: ${err.message}`,
          variant: "destructive"
        });
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      goToNextPage();
    } else if (e.key === 'ArrowLeft') {
      goToPrevPage();
    } else if (e.key === 'Escape') {
      if (isFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, pages.length, isFullscreen]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 pentagram-bg animate-slow-spin opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse-glow">
              <span className="font-demonic text-infernal-crimson text-2xl">Loading</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="min-h-screen bg-infernal-black flex flex-col items-center justify-center p-4">
        <X size={64} className="text-infernal-crimson mb-4" />
        <h1 className="font-demonic text-2xl text-white mb-2">Chapter Unavailable</h1>
        <p className="text-white/70 mb-6 text-center max-w-md">
          This chapter has been sealed or corrupted in the archives. It cannot be accessed at this time.
        </p>
        <Link to="/" className="ritual-button">
          Return to Archives
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Reader controls */}
      {showControls && (
        <div className="fixed top-0 left-0 right-0 z-10 bg-infernal-black/90 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-white/70 hover:text-white transition-colors">
                <Home size={20} />
              </Link>
              <button 
                onClick={() => window.history.back()} 
                className="text-white/70 hover:text-white flex items-center transition-colors"
              >
                <ArrowLeft size={18} className="mr-1" />
                Back
              </button>
            </div>
            
            <div className="text-white/80 font-ritual text-sm">
              Page {currentPage + 1} of {pages.length}
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowControls(false)} 
                className="text-white/70 hover:text-white transition-colors"
                title="Hide controls"
              >
                <X size={20} />
              </button>
              <button 
                onClick={toggleFullscreen} 
                className="text-white/70 hover:text-white transition-colors"
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
              <button 
                className="text-white/70 hover:text-white transition-colors"
                title="Settings"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Reader content */}
      <div 
        className="flex-1 flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={() => setShowControls(!showControls)}
      >
        <div className="relative max-h-screen max-w-full flex items-center justify-center">
          {pages[currentPage] && (
            <img 
              src={pages[currentPage]} 
              alt={`Page ${currentPage + 1}`} 
              className="max-h-screen max-w-full object-contain"
            />
          )}
        </div>
        
        {/* Side navigation areas */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1/4 cursor-w-resize"
          onClick={(e) => {
            e.stopPropagation();
            goToPrevPage();
          }}
        ></div>
        
        <div 
          className="absolute right-0 top-0 bottom-0 w-1/4 cursor-e-resize"
          onClick={(e) => {
            e.stopPropagation();
            goToNextPage();
          }}
        ></div>
      </div>
      
      {/* Bottom navigation */}
      {showControls && (
        <div className="fixed bottom-0 left-0 right-0 z-10 bg-infernal-black/90 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <button 
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className={`ritual-button py-2 px-4 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ArrowLeft size={18} />
            </button>
            
            <div className="text-white/80 font-ritual flex items-center gap-2">
              <div className="h-1 bg-infernal-darkest rounded-full w-60 overflow-hidden">
                <div 
                  className="h-full bg-infernal-crimson transition-all duration-300"
                  style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <button 
              onClick={goToNextPage}
              disabled={currentPage === pages.length - 1}
              className={`ritual-button py-2 px-4 ${currentPage === pages.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reader;
