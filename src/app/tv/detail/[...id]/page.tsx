import ToggleBtn from '@/features/common/toggle';
import Description from '@/features/tv/detail/description';
import TvDetailVideo from '@/features/tv/detail/video';
import { Credit } from '@/service/movieService';
import {
  getTvShowCredits,
  getTvShowDetails,
  getTvShowVideos,
} from '@/service/tvShowService';
import { getImages } from '@/utils/getImage';
import Image from 'next/image';
import React from 'react';

interface TvDetailProps {
  params: {
    id: string[];
  };
}

export default async function TvDetail({ params }: TvDetailProps) {
  const tvId = params.id[0];
  // fetch all data in parallel
  const [TvDetailData, tvDetailCreditData, tvDetailVideo] = await Promise.all([
    getTvShowDetails(tvId),
    getTvShowCredits(tvId),
    getTvShowVideos(tvId),
  ]);
  // get genres
  const tvDetailGenre = TvDetailData.genres
    .map((item: { id: number; name: string }) => {
      return item.name;
    })
    .join(', ');
  // vote average for arr
  const voteArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // tv credit data
  const tvDetailCredit = tvDetailCreditData.cast
    .slice(0, 5)
    .map((credit: Credit) => {
      return credit.name;
    })
    .join(', ');

  return (
    <div className="relative w-full h-full">
      <Image
        fill
        src={getImages(TvDetailData.poster_path)}
        alt={TvDetailData.name}
        className="z-10"
      />
      {/* for bg gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent z-20"></div>
      {/* big poster - info box */}
      <ToggleBtn />

      <div
        className="absolute top-[10%] left-1/2 translate-x-[-50%] md:left-12 md:translate-x-0 w-[calc(100%-72px)] h-[85%] bg-[rgba(0,0,0,0.5)] z-30 p-4 rounded-lg
    flex flex-col md:flex-row
  "
      >
        <Description
          TvDetailData={TvDetailData}
          tvDetailGenre={tvDetailGenre}
          tvDetailCredit={tvDetailCredit}
        />
        <div className="md:basis-7/12 flex justify-center items-center h-full">
          <TvDetailVideo tvDetailVideo={tvDetailVideo} />
        </div>
      </div>
    </div>
  );
}
