'use client';

import type { Movie } from '@/service/movieService';
import ContentSlider from './contentSlider';
import MovieBigPoster from './movieBigPoster';

interface MovieContentProps {
  movieNowPlaying: Movie[];
  moviePopular: Movie[];
  movieTopRated: Movie[];
}

export default function MovieContent({
  movieNowPlaying,
  moviePopular,
  movieTopRated,
}: MovieContentProps) {
  const bigPosterItem = movieNowPlaying[0];

  return (
    <div className="flex flex-col items-center bg-black pb-12">
      {/* movie big poster */}
      <MovieBigPoster bigPosterItem={bigPosterItem} />
      {/* movie slider */}
      <div className="w-full h-screen space-2">
        {/* movie now playing */}
        <ContentSlider
          subTitle="Now Playing"
          data={movieNowPlaying}
          link="now-playing"
        />
        {/* movie popular */}
        <ContentSlider subTitle="Popular" data={moviePopular} link="popular" />
        {/* movie top rated */}
        <ContentSlider
          subTitle="Top Rated"
          data={movieTopRated}
          link="top-rated"
        />
      </div>
    </div>
  );
}
