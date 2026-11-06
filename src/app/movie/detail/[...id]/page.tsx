import ToggleBtn from '@/features/common/toggle';
import Description from '@/features/movie/detail/description';
import MovieDetailVideo from '@/features/movie/detail/video';
import {
  Credit,
  getMovieCredits,
  getMovieDetails,
  getMovieVideos,
} from '@/service/movieService';
import { getImages } from '@/utils/getImage';
import Image from 'next/image';

interface MovieDetailProps {
  params: {
    id: string[];
  };
}

export default async function MovieDetail({ params }: MovieDetailProps) {
  const movieId = params.id[0];
  // fetch all data in parallel
  const [movieDetailData, movieDetailCreditData, movieDetailVideo] =
    await Promise.all([
      getMovieDetails(movieId),
      getMovieCredits(movieId),
      getMovieVideos(movieId),
    ]);
  // get genres
  const movieDetailGenre = movieDetailData.genres
    .map((item: { id: number; name: string }) => {
      return item.name;
    })
    .join(', ');
  // movie credit data
  const movieDetailCredit = movieDetailCreditData.cast
    .slice(0, 3)
    .map((credit: Credit) => {
      return credit.name;
    })
    .join(', ');

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-sky-50">
      <Image
        fill
        src={getImages(movieDetailData.poster_path)}
        alt={movieDetailData.title}
        className="z-0 object-cover object-center opacity-60 blur-[1px]"
      />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.2),transparent_36%),linear-gradient(120deg,rgba(3,7,18,0.78)_12%,rgba(3,7,18,0.54)_55%,rgba(3,7,18,0.8))]" />
      <ToggleBtn />
      <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 pb-10 pt-24 sm:px-8 lg:px-12">
        <div className="grid w-full gap-8 rounded-2xl border border-white/10 bg-black/35 p-5 shadow-2xl backdrop-blur-md sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:p-12">
        <Description
          movieDetailData={movieDetailData}
          movieDetailGenre={movieDetailGenre}
          movieDetailCredit={movieDetailCredit}
        />
        <div className="flex min-h-0 items-center justify-center">
          <MovieDetailVideo movieDetailVideo={movieDetailVideo} />
        </div>
        </div>
      </div>
    </main>
  );
}
