'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { trailerOpenAtom } from '@/data/detail';
import type { VideoResponse } from '@/service/movieService';
import { useAtomValue } from 'jotai';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

function VideoIframe({ videoKey, title }: { videoKey: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full md:w-3/4 h-full">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 rounded-md">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
          <p className="mt-2 text-sm text-sky-50/60 animate-pulse">Loading video...</p>
        </div>
      )}
      <iframe
        src={`https://www.youtube.com/embed/${videoKey}`}
        title={title}
        className={`w-full h-full transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        allow="autoplay; encrypted-media"
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

interface MovieDetailVideoProps {
  movieDetailVideo: VideoResponse;
}

export default function MovieDetailVideo({
  movieDetailVideo,
}: MovieDetailVideoProps) {
  const data = movieDetailVideo?.results;
  const open = useAtomValue(trailerOpenAtom);

  return (
    <Carousel
      orientation="vertical"
      className={`w-full ${
        open ? 'block' : 'hidden'
      } md:block duration-700 origin-center`}
    >
      <CarouselContent className="-mt-1 h-[500px] md:h-[325px]">
        {data.length > 0 ? (
          data?.map((item, index) => (
            <CarouselItem key={index} className="pt-1">
              <div className="p-1 h-full">
                <Card className="h-full">
                  <CardContent className="flex items-center justify-center p-6 h-full">
                    <VideoIframe videoKey={item.key} title={item.key} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))
        ) : (
          <CarouselItem className="pt-1">
            <div className="p-1 h-full">
              <Card className="h-full">
                <CardContent className="flex items-center justify-center p-6 h-full">
                  <div className="text-2xl text-sky-50 bg-[rgba(0,0,0,0.75)] w-full h-full rounded-md flex justify-center items-center">
                    No Video
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

