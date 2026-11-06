import Search from '@/components/custom/Search';
import SearchItem from '@/components/custom/SearchItem';
import SearchResultLabel from '@/components/custom/SearchResultLabel';
import { getSearch } from '@/service/common';

interface SearchPageProps {
  searchParams: {
    keyword?: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const keyword = searchParams.keyword?.trim() || '';
  const data = keyword
    ? ((await getSearch(keyword)) || []).filter(
        (item: any) => item.media_type === 'movie' || item.media_type === 'tv',
      )
    : [];

  const getLink = (media_type: string, id: number) => {
    return media_type === 'movie' ? `/movie/detail/${id}` : `/tv/detail/${id}`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <div
        className={`flex w-full justify-center ${
          keyword ? 'pt-24' : 'pt-[18vh]'
        }`}
      >
        <Search />
      </div>

      {keyword && (
        <>
          <SearchResultLabel dataLength={data.length} keyword={keyword}/>
          <div className="grid grid-cols-2 gap-4 px-6 pb-12 sm:grid-cols-3 md:grid-cols-5 md:px-24 md:pb-24">
            {data.map((item: any) => (
              <SearchItem
                key={`${item.media_type}-${item.id}`}
                item={item}
                link={getLink(item.media_type, item.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
