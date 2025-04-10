export type BaseMovie = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}


export type Movie = BaseMovie & {
  genre_ids:number[]
};

type genre = {
  id: number;
  name: string;
};

type production_companies = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

type production_countries = {
  iso_3166_1: string;
  name: string;
};

type spoken_languages = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

type BelongsToCollection = {
  id:number;
  name: string;
  poster_path:string;
  backdrop_path: string;
}

export type MovieResponse = {
  page:number;
  results: Movie[],
  total_pages: number;
  total_results: number;
};


export type MovieDetailResponse = BaseMovie & {
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: genre[];
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  production_companies: production_companies[];
  production_countries: production_countries[];
  revenue: number;
  runtime: number;
  spoken_languages: spoken_languages[];
  status: string;
  tagline: string;
};

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Crew {
  profile_path: string | null;
  id: number;
  name: string;
  job: string;
}

export interface CreditsResponse {
  id: number;
  cast: Cast[];
  crew: Crew[];
}
