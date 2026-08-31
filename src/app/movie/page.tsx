import MovieContent from '@/features/movie/movieContent';
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from '@/service/movieService';

export default async function MoviePage() {
  const movieNowPlaying = await getNowPlayingMovies();
  const moviePopular = await getPopularMovies();
  const movieTopRated = await getTopRatedMovies();

  return (
    <MovieContent
      movieNowPlaying={movieNowPlaying}
      moviePopular={moviePopular}
      movieTopRated={movieTopRated}
    />
  );
}
