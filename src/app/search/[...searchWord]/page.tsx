import React from 'react';
import { getSearch } from '@/service/common';
import SearchResultLabel from '@/components/custom/SearchResultLabel';
import SearchItem from './SearchItem';

interface SearchPageProps {
  params: {
    searchWord: string[];
  };
}

export default async function SearchPage({ params }: SearchPageProps) {
  const searchKey = decodeURIComponent(params.searchWord[0]);
  const data = (await getSearch(searchKey)).results;

  const getLink = (media_type: string, id: number) => {
    return media_type === 'movie' ? `/movie/detail/${id}` : `/tv/detail/${id}`;
  };

  return (
    <div className="flex flex-col bg-black">
      <SearchResultLabel dataLength={data.length} keyword={searchKey}/>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-12 mb-12 md:px-24 md:pb-24">
        {data.length > 0 &&
          data.map((item: any) => {
            return (
              <SearchItem
                key={item.id}
                item={item}
                link={getLink(item.media_type, item.id)}
              />
            );
          })}
      </div>
    </div>
  );
}
