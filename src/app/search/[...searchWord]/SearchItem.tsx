'use client';

import { Card, CardContent } from '@/components/ui/card';
import { AccentTextColor } from '@/utils/theme';
import { getImages } from '@/utils/getImage';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function SearchItem({ item, link }: { item: any, link: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Card>
      <CardContent className="group relative flex aspect-square items-center justify-center p-2 origin-bottom duration-300 hover:-translate-y-4">
        <Link href={link} className="w-full h-full relative block">
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 rounded-md animate-pulse z-10">
              <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
            </div>
          )}
          <Image
            fill
            className={`rounded-md group-hover:opacity-15 transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            src={getImages(item.poster_path || item.backdrop_path)}
            alt={item.name || item.title || ''}
            onLoad={() => setLoaded(true)}
          />
          <div className="absolute text-white top-0 left-0 w-full h-full pt-4 px-4 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 z-20">
            <h4
              className="text-xl text-center"
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
}
