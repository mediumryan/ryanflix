import Content from '@/features/tv/content';
import { AccentTextColor } from '@/utils/theme';
import { getAiringTodayTvShows } from '@/service/tvShowService';

export default async function Page() {
  const data = (await getAiringTodayTvShows()).results;

  return (
    <div className="flex flex-col bg-black">
      <div className="mt-24 mb-12 text-center text-2xl">
        <h2 style={{ textShadow: AccentTextColor }}>Tv : Airing Today</h2>
      </div>
      <Content data={data} type="airing-today" />
    </div>
  );
}
