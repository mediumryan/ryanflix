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
    <div className="relative w-full h-full">
      <Image
        fill
        src={getImages(movieDetailData.poster_path)}
        alt={movieDetailData.title}
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
          movieDetailData={movieDetailData}
          movieDetailGenre={movieDetailGenre}
          movieDetailCredit={movieDetailCredit}
        />
        <div className="md:basis-7/12 flex justify-center items-center h-full">
          <MovieDetailVideo movieDetailVideo={movieDetailVideo} />
        </div>
      </div>
    </div>
  );
}
