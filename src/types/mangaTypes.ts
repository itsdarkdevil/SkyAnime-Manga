
export interface Manga {
  id: string;
  title: string;
  coverImage: string;
  synopsis?: string;
  genres?: string[];
  status?: string;
  startDate?: string;
  endDate?: string;
  rating?: string;
  subtype?: string;
}

export interface MangaSearchResponse {
  data: Manga[];
  meta: {
    count: number;
  };
  links: {
    first: string;
    next?: string;
    last: string;
  };
}

export interface Chapter {
  id: string;
  chapter: string;
  title: string;
  publishedAt?: string;
}

export interface ChapterResponse {
  result: string;
  baseUrl: string;
  chapter: {
    hash: string;
    data: string[];
    dataSaver: string[];
  };
}
