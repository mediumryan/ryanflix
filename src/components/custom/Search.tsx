'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function Search() {
  const { t } = useTranslation('common');
  const [search, setSearch] = useState('');
  const router = useRouter();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const keyword = search.trim();
    if (!keyword) return;

    router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-2xl items-center gap-3 px-6"
    >
        <input
          aria-label={t('nav.search')}
          className="h-12 flex-1 rounded-md border border-zinc-700 bg-zinc-900 px-4 text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-red-500"
          type="text"
          placeholder={t('nav.searchPlaceholder')}
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.currentTarget.value);
          }}
        />
        <Button type="submit" className="h-12 bg-red-600 px-6 hover:bg-red-700">
          {t('nav.search')}
        </Button>
    </form>
  );
}
