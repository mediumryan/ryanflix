'use client';

import { trailerOpenAtom } from '@/data/detail';
import { AccentTextColor } from '@/service/common';
import { getImages } from '@/utils/getImage';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import React from 'react';

interface DescriptionProps {
  movieDetailData: any;
  movieDetailGenre: any;
  movieDetailCredit: string;
}

type ProductionCompaniesType = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export default function Description({
  movieDetailData,
  movieDetailGenre,
  movieDetailCredit,
}: DescriptionProps) {
  // vote average for arr
  const voteArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const open = useAtomValue(trailerOpenAtom);

  return (
    <div
      className={`md:basis-5/12 md:pt-24 md:pl-24 ${
        open ? 'hidden' : 'block'
      } md:block duration-700 origin-center`}
    >
      <h2 className="text-2xl" style={{ textShadow: AccentTextColor }}>
        {movieDetailData.title}
      </h2>
      <h5>{movieDetailData.original_title}</h5>
      <div className="my-8 text-sm">
        <p
          className="text-lg italic mb-2"
          style={{ textShadow: AccentTextColor }}
        >
          {movieDetailData.tagline}
        </p>
        <p className="max-h-[200px] overflow-y-scroll">
          {movieDetailData.overview}
        </p>
      </div>
      <div className="flex items-center text-sm">
        <span className="mr-2">장르 :</span>
        <p>{movieDetailGenre ? movieDetailGenre : ''}</p>
      </div>
      <div className="flex items-center text-sm mt-2">
        <span className="mr-2">평점 :</span>
        {voteArr.map((_, index: number) => {
          return (
            <span
              key={index}
              className={`flex items-center w-2 h-4 mr-1 rounded-[1px] ${
                movieDetailData.vote_average.toFixed(1) > index
                  ? 'bg-red-500'
                  : 'bg-sky-50'
              }
                  ${index === 9 && 'mr-2'}
                  `}
            />
          );
        })}
        <span className="tracking-wider">
          ({movieDetailData.vote_average.toFixed(1)})
        </span>
      </div>
      <div className="flex items-center text-sm mt-2">
        <span className="mr-2">제작사 :</span>
        {movieDetailData.production_companies
          .slice(0, 3)
          .map((item: ProductionCompaniesType) => {
            return (
              <div key={item.id} className="relative w-12 h-4 bg-white mr-1">
                <Image src={getImages(item.logo_path)} alt={item.name} fill />
              </div>
            );
          })}
      </div>
      <div className="flex items-center text-sm mt-2">
        <span className="mr-2">출연 :</span>
        <span>{movieDetailCredit}</span>
      </div>
      <div className="flex items-center text-sm mt-2">
        <span className="mr-2">개봉일 :</span>
        <p>{movieDetailData.release_date}</p>
      </div>
      <div className="flex items-center text-sm mt-2">
        <span className="mr-2">런타임 :</span>
        <p>{movieDetailData.runtime}분</p>
      </div>
      <div className="flex items-center text-sm mt-2">
        {movieDetailData.adult && (
          <span className="mr-2 bg-red-500 rounded-full p-1">청불</span>
        )}
      </div>
    </div>
  );
}
