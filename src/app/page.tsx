import { HomeCarousel } from '@/features/home/carousel';
import { getNowPlayingMovies } from '@/service/movieService';
import { getPopularTvShows } from '@/service/tvShowService';

export default async function Home() {
  const homeMoviesData = await getNowPlayingMovies();
  const homeTvShowsData = await getPopularTvShows();

  return (
    <div className="w-full min-h-screen pt-[80px] pb-8 bg-home-image bg-cover bg-center flex flex-col md:flex-row items-center justify-center md:justify-center gap-8 md:gap-4 overflow-y-auto">
      <HomeCarousel type="movie" data={homeMoviesData} />
      <HomeCarousel type="tv" data={homeTvShowsData} />
    </div>
  );
}
