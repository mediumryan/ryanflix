import { Card, CardContent } from '@/components/ui/card';
import { AccentTextColor, getSearch } from '@/service/common';
import { getImages } from '@/utils/getImage';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
              <Card key={item.id}>
                <CardContent className="group relative flex aspect-square items-center justify-center p-2 origin-bottom duration-300 hover:-translate-y-4">
                  <Link href={getLink(item.media_type, item.id)}>
                    <Image
                      fill
                      className="rounded-md group-hover:opacity-15"
                      src={getImages(item.poster_path || item.backdrop_path)}
                      alt={item.name}
                    />
                    <div className="absolute text-white top-0 left-0 w-full h-full pt-4 px-4 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                      <h4
                        className="text-xl"
                        style={{ textShadow: AccentTextColor }}
                      >
                        {item.media_type === 'movie'
                          ? item.title
                          : item.media_type === 'tv' && item.name}
                        ({item?.vote_average?.toFixed(1)})
                      </h4>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
