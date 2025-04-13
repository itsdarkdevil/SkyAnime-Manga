
import { Manga, MangaSearchResponse, Chapter, ChapterResponse } from '../types/mangaTypes';

const CORS_PROXY = "https://api.allorigins.win/get?url=";

// Search manga using Kitsu API
export const searchManga = async (query: string): Promise<Manga[]> => {
  try {
    const encodedQuery = encodeURIComponent(`https://kitsu.io/api/edge/manga?filter[text]=${query}`);
    const response = await fetch(`${CORS_PROXY}${encodedQuery}`);
    const data = await response.json();
    
    if (!data.contents) {
      return [];
    }
    
    const results = JSON.parse(data.contents).data || [];
    
    return results.map((manga: any) => {
      const attributes = manga.attributes;
      return {
        id: manga.id,
        title: attributes.canonicalTitle,
        coverImage: attributes.posterImage?.small || "",
        synopsis: attributes.synopsis,
        genres: attributes.genres || [],
        status: attributes.status,
        startDate: attributes.startDate,
        endDate: attributes.endDate,
        rating: attributes.averageRating,
        subtype: attributes.subtype
      };
    });
  } catch (error) {
    console.error('Error searching manga:', error);
    return [];
  }
};

// Get manga details from MangaDex by title
export const getMangaByTitle = async (title: string): Promise<string | null> => {
  try {
    const encodedTitle = encodeURIComponent(title);
    const searchUrl = `https://api.mangadex.org/manga?title=${encodedTitle}`;
    
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(searchUrl)}`);
    const data = await response.json();
    const mangaList = JSON.parse(data.contents).data;
    
    if (!mangaList.length) {
      return null;
    }
    
    return mangaList[0].id;
  } catch (error) {
    console.error('Error getting manga by title:', error);
    return null;
  }
};

// Get all chapters for a manga
export const getAllChapters = async (mangaId: string): Promise<Chapter[]> => {
  try {
    const allChapters: Chapter[] = [];
    let offset = 0;
    const limit = 100;
    
    // Recursively fetch all chapters
    const fetchChapters = async (): Promise<Chapter[]> => {
      const chaptersUrl = `https://api.mangadex.org/chapter?manga=${mangaId}&translatedLanguage[]=en&order[chapter]=asc&limit=${limit}&offset=${offset}`;
      const response = await fetch(`${CORS_PROXY}${encodeURIComponent(chaptersUrl)}`);
      const data = await response.json();
      const json = JSON.parse(data.contents);
      
      const newChapters = json.data;
      const total = json.total;
      
      const formattedChapters = newChapters.map((chap: any) => ({
        id: chap.id,
        chapter: chap.attributes.chapter || "?",
        title: chap.attributes.title || `Chapter ${chap.attributes.chapter}`,
        publishedAt: chap.attributes.publishAt
      }));
      
      allChapters.push(...formattedChapters);
      
      if (offset + limit < total) {
        offset += limit;
        return fetchChapters();
      } else {
        return allChapters;
      }
    };
    
    return await fetchChapters();
  } catch (error) {
    console.error('Error getting chapters:', error);
    return [];
  }
};

// Get pages for a chapter
export const getChapterPages = async (chapterId: string): Promise<string[]> => {
  try {
    const url = `https://api.mangadex.org/at-home/server/${chapterId}`;
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(url)}`);
    const data = await response.json();
    const result = JSON.parse(data.contents);
    
    const baseUrl = result.baseUrl;
    const chapter = result.chapter;
    
    return chapter.data.map((filename: string) => 
      `${baseUrl}/data/${chapter.hash}/${filename}`
    );
  } catch (error) {
    console.error('Error getting chapter pages:', error);
    return [];
  }
};

// Get featured/trending manga
export const getFeaturedManga = async (): Promise<Manga[]> => {
  try {
    const encodedQuery = encodeURIComponent(`https://kitsu.io/api/edge/trending/manga`);
    const response = await fetch(`${CORS_PROXY}${encodedQuery}`);
    const data = await response.json();
    
    if (!data.contents) {
      return [];
    }
    
    const results = JSON.parse(data.contents).data || [];
    
    return results.map((manga: any) => {
      const attributes = manga.attributes;
      return {
        id: manga.id,
        title: attributes.canonicalTitle,
        coverImage: attributes.posterImage?.small || "",
        synopsis: attributes.synopsis,
        genres: attributes.categories || [],
        status: attributes.status,
        startDate: attributes.startDate,
        endDate: attributes.endDate,
        rating: attributes.averageRating,
        subtype: attributes.subtype
      };
    });
  } catch (error) {
    console.error('Error fetching featured manga:', error);
    return [];
  }
};

// Default manga for demo purposes
export const getDefaultManga = (): Manga[] => {
  return [
    {
      id: "1",
      title: "Berserk",
      coverImage: "https://media.kitsu.io/manga/poster_images/berserk.jpg",
      synopsis: "His name is Guts, the Black Swordsman, a feared warrior...",
      genres: ["Horror", "Action", "Fantasy"],
      status: "ongoing"
    },
    {
      id: "2",
      title: "Hellsing",
      coverImage: "https://media.kitsu.io/manga/poster_images/hellsing.jpg",
      synopsis: "Hellsing follows the antiheroic vampire Alucard...",
      genres: ["Horror", "Supernatural", "Action"],
      status: "finished"
    },
    {
      id: "3",
      title: "Tokyo Ghoul",
      coverImage: "https://media.kitsu.io/manga/poster_images/tokyo_ghoul.jpg",
      synopsis: "Shy Ken Kaneki is thrilled to go on a date with the beautiful Rize...",
      genres: ["Horror", "Supernatural", "Psychological"],
      status: "finished"
    },
    {
      id: "4",
      title: "Chainsaw Man",
      coverImage: "https://media.kitsu.io/manga/poster_images/chainsaw_man.jpg",
      synopsis: "Denji has a simple dream—to live a happy and peaceful life...",
      genres: ["Action", "Supernatural", "Horror"],
      status: "ongoing"
    },
    {
      id: "5",
      title: "Jujutsu Kaisen",
      coverImage: "https://media.kitsu.io/manga/poster_images/jujutsu_kaisen.jpg",
      synopsis: "Yuji Itadori is a boy with tremendous physical strength...",
      genres: ["Supernatural", "Action", "Horror"],
      status: "ongoing"
    },
    {
      id: "6",
      title: "Gantz",
      coverImage: "https://media.kitsu.io/manga/poster_images/gantz.jpg",
      synopsis: "After trying to save someone from getting hit by a train...",
      genres: ["Sci-Fi", "Action", "Horror"],
      status: "finished"
    }
  ];
};
