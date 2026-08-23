import Content from '@/features/movie/content';
import { AccentTextColor } from '@/utils/theme';
import { getTopRatedMovies } from '@/service/movieService';

export default async function Page() {
  const data = (await getTopRatedMovies()).results;

  return (
    <div className="flex flex-col bg-black">
      <div className="mt-24 mb-12 text-center text-2xl">
        <h2 style={{ textShadow: AccentTextColor }}>Movie : Top Rated</h2>
      </div>
      <Content data={data} type={'top-rated'} />
    </div>
  );
}
