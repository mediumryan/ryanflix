import React from 'react';
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
  // tv credit data
  const tvDetailCredit = tvDetailCreditData.cast
    .slice(0, 5)
    .map((credit: Credit) => {
      return credit.name;
    })
    .join(', ');

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-sky-50">
      <Image
        fill
        src={getImages(TvDetailData.poster_path)}
        alt={TvDetailData.name}
        className="z-0 object-cover object-center opacity-40 blur-[2px]"
      />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.18),transparent_36%),linear-gradient(120deg,rgba(3,7,18,0.98)_12%,rgba(3,7,18,0.78)_55%,rgba(3,7,18,0.94))]" />
      <ToggleBtn />

      <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 pb-10 pt-24 sm:px-8 lg:px-12">
        <div className="grid w-full gap-8 rounded-2xl border border-white/10 bg-black/35 p-5 shadow-2xl backdrop-blur-md sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:p-12">
        <Description
          TvDetailData={TvDetailData}
          tvDetailGenre={tvDetailGenre}
          tvDetailCredit={tvDetailCredit}
        />
        <div className="flex min-h-0 items-center justify-center">
          <TvDetailVideo tvDetailVideo={tvDetailVideo} />
        </div>
        </div>
      </div>
    </main>
  );
}
