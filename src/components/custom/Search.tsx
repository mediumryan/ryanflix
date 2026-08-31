'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export default function Search() {
  const { t } = useTranslation('common');

  const [search, setSearch] = useState('');
  const [resultMsg, setResultMsg] = useState('');

  const onSubmit = async () => {
    const res = await fetch(`/api/search/${search}`);
    const data = await res.json();
    if (data === 0) setResultMsg(t('search.noResult', { keyword: search }));
    else setResultMsg(t('search.resultSuccess', { keyword: search }));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.currentTarget.value);
          }}
        />
        <Button>Submit</Button>
      </form>
      <h2 className="text-center text-2xl font-bold italic pt-24 pb-12">
        {resultMsg}
      </h2>
    </>
  );
}
