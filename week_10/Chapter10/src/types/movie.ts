export type MovieLanguage = "ko-KR" | "en-US" | "ja-JP"

export type MovieFilters = {
  query: string;
  include_adult: boolean;
  language: string;
}

export type Movie = {
  adult: boolean,
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview:  string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}