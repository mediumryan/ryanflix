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
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 rounded-md">
          <Loader2 className="h-8 w-8 animate-spin text-red-500" />
          <p className="mt-2 text-sm text-sky-50/60 animate-pulse">Loading video...</p>
        </div>
      )}
      <iframe
        src={`https://www.youtube.com/embed/${videoKey}`}
        title={title}
        className={`h-full w-full transition-opacity duration-300 ${
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
      className={`w-full max-w-3xl ${
        open ? 'block' : 'hidden'
      } md:block duration-700 origin-center`}
    >
      <CarouselContent className="-mt-1 h-[280px] sm:h-[360px] lg:h-[420px]">
        {data.length > 0 ? (
          data?.map((item, index) => (
            <CarouselItem key={index} className="pt-1">
              <div className="h-full p-1">
                <Card className="h-full overflow-hidden border-white/10 bg-black/40">
                  <CardContent className="flex h-full items-center justify-center p-2 sm:p-4">
                    <VideoIframe videoKey={item.key} title={item.key} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))
        ) : (
          <CarouselItem className="pt-1">
            <div className="h-full p-1">
              <Card className="h-full overflow-hidden border-white/10 bg-black/40">
                <CardContent className="flex h-full items-center justify-center p-2 sm:p-4">
                  <div className="flex h-full w-full items-center justify-center rounded-xl bg-black/70 text-center text-xl text-sky-50 sm:text-2xl">
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

