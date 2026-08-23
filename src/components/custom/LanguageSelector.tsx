'use client';

import { useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { GlobalLoader } from './Loader';

export function LanguageSelector() {
  const { i18n, t } = useTranslation('common');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    Cookies.set('language', newLang, { path: '/' });
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {isPending && <GlobalLoader message={t('nav.loading', 'Loading...')} />}
      <select
        className="bg-transparent text-white border border-gray-500 rounded p-1 mx-2"
        value={i18n.language}
        onChange={handleLanguageChange}
        disabled={isPending}
      >
        <option value="ja" className="text-black">日本語</option>
        <option value="ko" className="text-black">한국어</option>
        <option value="en" className="text-black">English</option>
      </select>
    </>
  );
}

