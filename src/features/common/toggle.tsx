'use client';

import { Button } from '@/components/ui/button';
import { trailerOpenAtom } from '@/data/detail';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';

export default function ToggleBtn() {
  const [open, setOpen] = useAtom(trailerOpenAtom);

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <Button
      className="absolute right-5 top-24 z-40 rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white shadow-lg backdrop-blur-md hover:bg-white/20 md:hidden"
      onClick={() => {
        setOpen(!open);
      }}
    >
      {open ? 'Info' : 'Trailer'}
    </Button>
  );
}
