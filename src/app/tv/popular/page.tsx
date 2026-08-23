import Content from '@/features/tv/content';
import { AccentTextColor } from '@/utils/theme';
import { getPopularTvShows } from '@/service/tvShowService';

export default async function Page() {
  const data = (await getPopularTvShows()).results;

  return (
    <div className="flex flex-col bg-black">
      <div className="mt-24 mb-12 text-center text-2xl">
        <h2 style={{ textShadow: AccentTextColor }}>Tv : Popular</h2>
      </div>
      <Content data={data} type="popular" />
    </div>
  );
}
