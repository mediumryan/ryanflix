'use client';

import { Loader2 } from 'lucide-react';

interface GlobalLoaderProps {
  message?: string;
}

export function GlobalLoader({ message }: GlobalLoaderProps) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
      <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
      {message && (
        <p className="mt-4 text-sky-50 text-sm animate-pulse">{message}</p>
      )}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="w-full h-[calc(100vh-72px)] flex flex-col items-center justify-center bg-black">
      <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
      <p className="mt-3 text-sky-50/70 text-sm animate-pulse">Loading...</p>
    </div>
  );
}
