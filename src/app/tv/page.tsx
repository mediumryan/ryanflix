import TvContent from '@/features/tv/tvContent';
import {
  getAiringTodayTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
} from '@/service/tvShowService';

export default async function TvPage() {
  const tvAiringToday = await getAiringTodayTvShows();
  const tvPopular = await getPopularTvShows();
  const tvTopRated = await getTopRatedTvShows();

  return (
    <TvContent
      tvAiringToday={tvAiringToday}
      tvPopular={tvPopular}
      tvTopRated={tvTopRated}
    />
  );
}
