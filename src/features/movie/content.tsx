'use client';

import { getImages } from '@/utils/getImage';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { AccentTextColor } from '@/utils/theme';
import type { Movie } from '@/service/movieService';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Loader } from 'lucide-react';

interface ContentProps {
  data: Movie[];
  type: string;
}

export default function Content({ data, type }: ContentProps) {
  const [dataArr, setDataArr] = useState<Movie[]>([]);
  const [page, setPage] = useState(2);
  const [isLoadedList, setIsLoadedList] = useState<boolean[]>([]);

  // Intersection Observer
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.25,
  });

  useEffect(() => {
    if (dataArr.length === 0) {
      setDataArr(data);
      setIsLoadedList(Array(data.length).fill(false));
    }
  }, [data, dataArr.length]);

  useEffect(() => {
    const reqType =
      type === 'popular'
        ? 'getPopular'
        : type === 'top-rated'
        ? 'getTopRated'
        : 'getNowPlaying';

    const getData = async () => {
      setPage((pre) => pre + 1);
      const res = await fetch(`/movie/api/${reqType}/${page}`);
      const newData = await res.json();
      setDataArr((prev) => [...prev, ...newData]);
      setIsLoadedList((prev) => [
        ...prev,
        ...Array(newData.length).fill(false),
      ]);
    };

    if (inView) {
      getData();
    }
  }, [inView, page, type]);

  return (
    <div
      id={`movie-content-${type}`}
      className="grid grid-cols-2 md:grid-cols-5 gap-4 px-12 mb-12 md:px-24 md:pb-24"
    >
      {dataArr.map((item, index) => (
        <Card key={item.id}>
          <CardContent className="group relative flex aspect-square items-center justify-center p-2 origin-bottom duration-300 hover:-translate-y-4">
            <Link href={`/movie/detail/${item.id}`}>
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
                alt={item.title}
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
