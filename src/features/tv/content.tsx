'use client';

import { getImages } from '@/utils/getImage';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { AccentTextColor } from '@/service/common';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Tv } from '@/service/tvShowService';
import { Loader } from 'lucide-react';

interface ContentProps {
  data: Tv[];
  type: string;
}

export default function Content({ data, type }: ContentProps) {
  const [dataArr, setDataArr] = useState<Tv[]>([]);
  const [page, setPage] = useState(2);
  const [isLoadedList, setIsLoadedList] = useState<boolean[]>([]);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.25,
  });

  useEffect(() => {
    if (dataArr.length === 0) {
      setDataArr(data);
    }
  }, [data, dataArr.length]);

  useEffect(() => {
    const reqType =
      type === 'airing-today'
        ? 'getAiringToday'
        : type === 'popular'
        ? 'getPopular'
        : 'getTopRated';
    const getData = async () => {
      setPage((pre) => pre + 1);
      const res = await fetch(`/tv/api/getAiringToday/${page}`);
      const data = await res.json();
      setDataArr((pre) => {
        const newData = [...pre, ...data];
        return newData;
      });
    };
    if (inView) {
      getData();
    }
  }, [inView, page, type]);

  return (
    <div
      id={`tv-content-${type}`}
      className="grid grid-cols-2 md:grid-cols-5 gap-4 px-12 mb-12 md:px-24 md:pb-24"
    >
      {dataArr.map((item, index) => (
        <Card key={item.id}>
          <CardContent className="group relative flex aspect-square items-center justify-center p-2 origin-bottom duration-300 hover:-translate-y-4">
            <Link href={`/tv/detail/${item.id}`}>
              {!isLoadedList[index] && (
                <>
                  <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-md z-10"></div>
                  <div className="w-full h-full flex items-center justify-center">
                    <Loader
                      className="animate-spin text-gray-500"
                      size={40}
                      style={{ textShadow: AccentTextColor }}
                    />
                  </div>
                </>
              )}
              <Image
                fill
                className={`rounded-md group-hover:opacity-15 transition-opacity duration-300 ${
                  isLoadedList[index] ? 'opacity-100' : 'opacity-0'
                }`}
                src={getImages(item.poster_path || item.backdrop_path)}
                alt={item.name ? item.name : 'No title'}
                onLoad={() => {
                  setIsLoadedList((prev) => {
                    const newArr = [...prev];
                    newArr[index] = true;
                    return newArr;
                  });
                }}
              />
              <div className="absolute text-white top-0 left-0 w-full h-full pt-4 px-4 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                <h4 className="text-xl" style={{ textShadow: AccentTextColor }}>
                  {item.title}({item.vote_average?.toFixed(1)})
                </h4>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
      <div ref={ref} className="w-full h-12"></div>
    </div>
  );
}
