import { fetchTMDB } from '@/service/common';

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
  const res = await fetchTMDB('/tv/popular', { page });
  return res.results as Tv[];
};

export const getAiringTodayTvShows = async (page: number = 1) => {
  const res = await fetchTMDB('/tv/airing_today', { page });
  return res.results as Tv[];
};

export const getTopRatedTvShows = async (page: number = 1) => {
  const res = await fetchTMDB('/tv/top_rated', { page });
  return res.results as Tv[];
};

export const getTvShowDetails = async (tvShowId: string) => {
  const res = await fetchTMDB(`/tv/${tvShowId}`);
  return res;
};

export const getTvShowCredits = async (tvShowId: string) => {
  return await fetchTMDB(`/tv/${tvShowId}/credits`);
};

export const getTvShowVideos = async (tvShowId: string) => {
  return await fetchTMDB(`/tv/${tvShowId}/videos`);
};
