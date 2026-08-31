'use client';

import { Menu, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';

const NAV_GROUP_STYLE = `group flex items-center md:w-fit md:min-w-[72px] justify-center`;
const MAIN_BTN_STYLE = `w-64 md:w-full flex-1 rounded-md text-center text-red-500 text-sm font-bold px-2 py-1 whitespace-nowrap group-hover:bg-sky-50 group-hover:text-black data-[state=open]:bg-sky-50 data-[state=open]:text-black transition-colors`;
const SUB_BTN_WRAPPER_STYLE = `hidden md:flex flex-col gap-0.5 border-none w-[fit-content] bg-transparent p-1 rounded-md`;
const SUB_BTN_STYLE = `text-red-500 text-sm font-bold px-3 py-1.5 rounded-md hover:text-black hover:bg-sky-50 transition-colors`;

export function Navigation() {
  const pathName = usePathname();
  const { t } = useTranslation('common');

  const [open, setOpen] = useState(false);
  const [searchWord, setSearchWord] = useState('');

  const links = [
    [
      { link: '/movie/now-playing', label: t('nav.nowPlaying') },
      { link: '/movie/popular', label: t('nav.popular') },
      { link: '/movie/top-rated', label: t('nav.topRated') },
    ],
    [
      { link: '/tv/airing-today', label: t('nav.airingToday') },
      { link: '/tv/popular', label: t('nav.popular') },
      { link: '/tv/top-rated', label: t('nav.topRated') },
    ],
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathName]);

  return (
    <nav
      className={`w-full p-2 pb-4 bg-[rgba(0,0,0,0.9)] absolute top-0 left-0 z-50 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 md:bg-transparent duration-700`}
    >
      <div className="flex flex-col items-center md:flex-row gap-2 md:gap-8 ml-2">
        <Link
          href="/"
          className="w-fit text-xl text-center italic font-bold tracking-[-1.5px] bg-gradient-to-r from-[#575d63] to-[#16032c] text-gradient rounded-l-2xl"
        >
          RYANFLIX
        </Link>
        <div
          className={`${open ? 'flex' : 'hidden'} flex-col md:flex md:flex-row items-center gap-2 md:gap-4`}
        >
          {/* Movies 메뉴 */}
          <div className={NAV_GROUP_STYLE}>
            <HoverCard openDelay={0} closeDelay={150}>
              <HoverCardTrigger asChild>
                <Link
                  href="/movie"
                  className={`${MAIN_BTN_STYLE} ${pathName.includes('/movie') ? 'bg-sky-50 text-black' : ''}`}
                >
                  {t('nav.movies')}
                </Link>
              </HoverCardTrigger>
              <HoverCardContent
                className={SUB_BTN_WRAPPER_STYLE}
                align="start"
                sideOffset={0}
              >
                {links[0].map((item, index) => (
                  <Link
                    key={`movie_${index}`}
                    href={item.link}
                    className={`${SUB_BTN_STYLE} ${pathName === item.link ? 'bg-sky-50 text-black' : ''}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* TV Shows 메뉴 */}
          <div className={NAV_GROUP_STYLE}>
            <HoverCard openDelay={0} closeDelay={150}>
              <HoverCardTrigger asChild>
                <Link
                  href="/tv"
                  className={`${MAIN_BTN_STYLE} ${pathName.includes('/tv') ? 'bg-sky-50 text-black' : ''}`}
                >
                  {t('nav.tvShows')}
                </Link>
              </HoverCardTrigger>
              <HoverCardContent
                className={SUB_BTN_WRAPPER_STYLE}
                align="start"
                sideOffset={0}
              >
                {links[1].map((item, index) => (
                  <Link
                    key={`tv_${index}`}
                    href={item.link}
                    className={`${SUB_BTN_STYLE} ${pathName === item.link ? 'bg-sky-50 text-black' : ''}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        {/* 검색 */}
        <Link
          href={`/search/`}
          className={`${open ? 'flex' : 'hidden'} md:flex text-red-500 text-sm items-center gap-1 hover:scale-105 hover:opacity-75`}
        >
          <SearchIcon width={14} />
          <span>{t('nav.search')}</span>
        </Link>
      </div>

      <LanguageSelector open={open} />

      <Menu
        className="absolute top-2 right-4 hover:text-red-500 md:hidden cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </nav>
  );
}
