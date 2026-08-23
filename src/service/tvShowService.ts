import { fetchTMDB } from '@/service/index';

export type Tv = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  title?: string;
};

export type TvResponse = {
  page: number;
  results: Tv[];
};

// TV Shows
export const getPopularTvShows = async (page: number = 1) => {
  return fetchTMDB('/tv/popular', { page }) as Promise<TvResponse>;
};

export const getAiringTodayTvShows = async (page: number = 1) => {
  return fetchTMDB('/tv/airing_today', { page }) as Promise<TvResponse>;
};

export const getTopRatedTvShows = async (page: number = 1) => {
  return fetchTMDB('/tv/top_rated', { page }) as Promise<TvResponse>;
};

export const getTvShowDetails = async (tvShowId: string) => {
  return fetchTMDB(`/tv/${tvShowId}`);
};

export const getTvShowCredits = async (tvShowId: string) => {
  return fetchTMDB(`/tv/${tvShowId}/credits`);
};

export const getTvShowVideos = async (tvShowId: string) => {
  return fetchTMDB(`/tv/${tvShowId}/videos`);
};

