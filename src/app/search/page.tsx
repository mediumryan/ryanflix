import Search from '@/components/custom/Search';
import SearchItem from '../../components/custom/SearchItem';

type SearchPageProps = {
  keyword: string;
};

const SearchPage = ({ keyword }: SearchPageProps) => {
  const getLink = (media_type: string, id: number) => {
    return media_type === 'movie' ? `/movie/detail/${id}` : `/tv/detail/${id}`;
  };

  return (
    <>
      <Search />
      <div className="flex flex-col bg-black"></div>
    </>
  );
};

export default SearchPage;
