import type { Tv } from '@/service/tvShowService';
import React from 'react';
import TvBigPoster from './tvBigPoster';
import ContentSlider from './contentSlider';

interface TvContentProps {
  tvAiringToday: Tv[];
  tvPopular: Tv[];
  tvTopRated: Tv[];
}

export default function TvContent({
  tvAiringToday,
  tvPopular,
  tvTopRated,
}: TvContentProps) {
  const bigPosterItem = tvAiringToday[0];

  return (
    <div className="flex flex-col items-center bg-black pb-12">
      {/* movie big poster */}
      <TvBigPoster bigPosterItem={bigPosterItem} />
      {/* movie slider */}
      <div className="w-full h-screen space-2">
        {/* movie now playing */}
        <ContentSlider
          subTitle="Airing Today"
          link="airing-today"
          data={tvAiringToday}
        />
        {/* movie popular */}
        <ContentSlider subTitle="Popular" link="popular" data={tvPopular} />
        {/* movie top rated */}
        <ContentSlider
          subTitle="Top Rated"
          link="top-rated"
          data={tvTopRated}
        />
      </div>
    </div>
  );
}
