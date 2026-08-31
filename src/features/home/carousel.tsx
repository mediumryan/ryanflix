'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import type { Movie, MovieResponse } from '@/service/movieService';
import type { Tv, TvResponse } from '@/service/tvShowService';
import { getImages } from '@/utils/getImage';
import Autoplay from 'embla-carousel-autoplay';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface HomeCarouselProps {
  type: string;
  data: Movie[] | Tv[];
}

function CarouselImage({
  src,
  alt,
  href,
}: {
  src: string;
  alt: string;
  href: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      className="rounded-md w-[250px] h-[300px] md:w-[300px] md:h-[400px] flex justify-center items-center bg-black relative"
      href={href}
    >
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 rounded-md animate-pulse">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        </div>
      )}
      <img
        className={`rounded-md w-full h-full transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
      />
    </Link>
  );
}

export function HomeCarousel({ type, data }: HomeCarouselProps) {
  const { t } = useTranslation('common');

  return (
    <div>
      <div className="opacity-85 md:opacity-70 hover:opacity-100">
        <h2 className="text-lg font-bold italic text-center">
          {type === 'movie' ? t('nav.movies') : t('nav.tvShows')}
        </h2>
        <Carousel
          className="w-full max-w-xs m-4 rounded-md overflow-hidden"
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnMouseEnter: true,
              stopOnInteraction: false,
            }),
          ]}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {data?.map((item, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="rounded-md overflow-hidden">
                    <CardContent className="flex aspect-square items-center justify-center">
                      <CarouselImage
                        src={getImages(item.poster_path || item.backdrop_path)}
                        alt={
                          type === 'movie' ? item?.title || '' : item.name || ''
                        }
                        href={type === 'movie' ? '/movie' : '/tv'}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
