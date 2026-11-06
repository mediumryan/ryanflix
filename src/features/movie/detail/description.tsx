'use client';

import { trailerOpenAtom } from '@/data/detail';
import { AccentTextColor } from '@/utils/theme';
import { getImages } from '@/utils/getImage';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('common');

  return (
    <div
      className={`md:basis-5/12 md:pt-24 md:pl-24 ${
        open ? 'hidden' : 'block'
      } md:block min-w-0 duration-700 origin-center`}
    >
      <h2 className="break-words text-3xl font-bold leading-tight sm:text-4xl" style={{ textShadow: AccentTextColor }}>
        {movieDetailData.title}
      </h2>
      <h5 className="mt-2 text-sm text-sky-50/60">{movieDetailData.original_title}</h5>
      <div className="my-7 space-y-3 text-sm leading-6 text-sky-50/80 sm:my-9">
        <p
          className="text-lg italic leading-7 text-sky-50"
          style={{ textShadow: AccentTextColor }}
        >
          {movieDetailData.tagline}
        </p>
        <p className="max-h-40 overflow-y-auto pr-2 sm:max-h-48">
          {movieDetailData.overview}
        </p>
      </div>
      <div className="flex flex-wrap items-start gap-x-2 gap-y-1 text-sm">
        <span className="shrink-0 text-sky-50/60">{t('detail.genre')} :</span>
        <p className="min-w-0 break-words">{movieDetailGenre || ''}</p>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-2 text-sm">
        <span className="shrink-0 text-sky-50/60">{t('detail.rating')} :</span>
        <div className="flex items-center">
          {voteArr.map((_, index: number) => {
          return (
            <span
              key={index}
              className={`mr-1 h-3 w-1.5 rounded-sm ${
                movieDetailData.vote_average.toFixed(1) > index
                  ? 'bg-red-500'
                  : 'bg-sky-50'
              }
                  `}
            />
          );
          })}
        </div>
        <span className="tracking-wider">
          ({movieDetailData.vote_average.toFixed(1)})
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="shrink-0 text-sky-50/60">{t('detail.productionCompany')} :</span>
        <div className="flex flex-wrap gap-1">
          {movieDetailData.production_companies
          .slice(0, 3)
          .map((item: ProductionCompaniesType) => {
            return (
              <div key={item.id} className="relative h-6 w-14 rounded-sm bg-white p-1">
                <Image src={getImages(item.logo_path)} alt={item.name} fill />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-start gap-x-2 gap-y-1 text-sm">
        <span className="shrink-0 text-sky-50/60">{t('detail.cast')} :</span>
        <span className="min-w-0 break-words">{movieDetailCredit}</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-2 text-sm">
        <span className="text-sky-50/60">{t('detail.releaseDate')} :</span>
        <p>{movieDetailData.release_date}</p>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-2 text-sm">
        <span className="text-sky-50/60">{t('detail.runtime')} :</span>
        <p>{movieDetailData.runtime} {t('detail.runtimeUnit')}</p>
      </div>
      <div className="mt-4 flex items-center text-sm">
        {movieDetailData.adult && (
          <span className="rounded-full bg-red-500/90 px-3 py-1 text-xs font-semibold">R18+</span>
        )}
      </div>
    </div>
  );
}

