import { fetchTMDB } from '@/service/common';

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
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
  name?: string;
};

export type MovieResponse = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Movie[];
};

export type Credit = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type CreditResponse = {
  id: number;
  cast: Credit[];
};

export type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type VideoResponse = {
  id: number;
  results: Video[];
};

// Movies
export const getNowPlayingMovies = async (page: number = 1) => {
  const res = await fetchTMDB('/movie/now_playing', { page });
  return res.results as Movie[];
};

export const getPopularMovies = async (page: number = 1) => {
  const res = await fetchTMDB('/movie/popular', { page });
  return res.results as Movie[];
};

export const getTopRatedMovies = async (page: number = 1) => {
  const res = await fetchTMDB('/movie/top_rated', { page });
  return res.results as Movie[];
};

export const getMovieDetails = async (movieId: string) => {
  return fetchTMDB(`/movie/${movieId}`);
};

export const getMovieCredits = async (movieId: string) => {
  const res = await fetchTMDB(`/movie/${movieId}/credits`);
  return res as CreditResponse;
};

export const getMovieVideos = async (movieId: string) => {
  const res = await fetchTMDB(`/movie/${movieId}/videos`);
  return res as VideoResponse;
};
