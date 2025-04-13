'use client';

import { Check, Menu, Search, StepBack } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';

export function Navigation() {
  const pathName = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(true);

  const [searchWord, setSearchWord] = useState('');
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search/${searchWord}`);
    setSearchWord('');
  };

  const links = [
    [
      { link: '/movie/now-playing', text: 'Now Playing' },
      { link: '/movie/popular', text: 'Popular' },
      { link: '/movie/top-rated', text: 'Top Rated' },
    ],
    [
      { link: '/tv/airing-today', text: 'Airing Today' },
      { link: '/tv/popular', text: 'Popular' },
      { link: '/tv/top-rated', text: 'Top Rated' },
    ],
  ];

  const mainBtnStyle = `text-red-500 font-bold mx-1 p-1 hover:text-black hover:bg-sky-50`;

  const subBtnWrapperStyle = `md:absolute left-0 md:hidden md:w-[120px] py-2 mt-1 flex group-hover:flex flex-col justify-center items-center bg-sky-50`;

  const subBtnStyle = `text-red-500 font-bold mx-1 p-1 hover:text-black hover:bg-sky-50`;

  const getBgByPath = (path: string) => {
    if (path === '/movie') {
      return pathName.includes(path) ? ' bg-sky-50' : '';
    } else if (path === '/tv') {
      return pathName.includes(path) ? ' bg-sky-50' : '';
    }
    return pathName === path ? ' bg-sky-50' : '';
  };

  useEffect(() => {
    setOpen(true);
  }, [pathName]);

  return (
    <nav
      className={`w-full p-2 ${
        open ? 'pb-2 bg-[rgba(0,0,0,0.5)]' : 'pb-8 bg-[rgba(0,0,0,0.9)]'
      } absolute top-0 left-0 z-50 flex flex-col md:flex-row items-center justify-between md:bg-transparent duration-700`}
    >
      <Link
        href="/"
        className="mr-8 text-xl italic font-bold tracking-[-1.5px] bg-gradient-to-r from-[#575d63] to-[#16032c] text-gradient rounded-l-2xl"
      >
        RYANFLIX
      </Link>
      <ul
        className={`w-1/2 md:w-full my-4 text-sm text-center md:flex ${
          open ? 'hidden' : 'block'
        }`}
      >
        <li
          className={`${mainBtnStyle} ${getBgByPath('/')}`}
          style={{ borderRadius: '10px 10px 10px 0' }}
        >
          <Link href="/">HOME</Link>
        </li>
        <li
          className={`group relative ${mainBtnStyle} ${getBgByPath('/movie')}`}
          style={{ borderRadius: '10px 10px 10px 0' }}
        >
          <Link href="/movie">MOVIES</Link>
          <div
            className={subBtnWrapperStyle}
            style={{ borderRadius: '0 10px 10px 10px' }}
          >
            {links[0].map((item, index) => {
              return (
                <Link
                  key={`movie_${index}`}
                  href={item.link}
                  className={subBtnStyle}
                >
                  {item.text}
                </Link>
              );
            })}
          </div>
        </li>
        <li
          className={`relative group ${mainBtnStyle} ${getBgByPath('/tv')}`}
          style={{ borderRadius: '10px 10px 10px 0' }}
        >
          <Link href="/tv">TV SHOWS</Link>
          <div
            className={subBtnWrapperStyle}
            style={{ borderRadius: '0 10px 10px 10px' }}
          >
            {links[1].map((item, index) => {
              return (
                <Link
                  key={`tv_${index}`}
                  href={item.link}
                  className={subBtnStyle}
                >
                  {item.text}
                </Link>
              );
            })}
          </div>
        </li>
      </ul>
      <form
        onSubmit={handleSubmit}
        className={`flex items-center md:flex ${open ? 'hidden' : 'flex'}`}
      >
        <Search className="w-8 h-6" />
        <Input
          className="mx-2 text-black h-8 md:w-[250px]"
          type="text"
          value={searchWord}
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        <Button className="bg-transparent p-0">
          <Check className="w-8 h-6" />
        </Button>
      </form>
      <button
        className="md:hidden absolute top-3 left-4 hover:text-red-500"
        onClick={() => {
          router.back();
        }}
      >
        <StepBack />
      </button>
      <Menu
        className="absolute top-2 right-4 hover:text-red-500 md:hidden"
        onClick={() => {
          setOpen(!open);
        }}
      />
    </nav>
  );
}
