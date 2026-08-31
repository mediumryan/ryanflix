import React from 'react';
import SearchItem from './SearchItem';
import { getSearch } from '@/service/common';

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

  console.log('search data', data);

  return (
    <div className="flex flex-col bg-black">
      <h2 className="text-center text-2xl font-bold italic pt-24 pb-12">
        {data.length > 0
          ? `[ ${searchKey} ]로 검색한 결과 입니다.`
          : `[ ${searchKey} ]로 검색한 결과가 없습니다.`}
      </h2>
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
