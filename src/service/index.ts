import { cookies } from 'next/headers';

export const getParams = () => {
  const cookieStore = cookies();
  const lang = cookieStore.get('language')?.value || 'ja';
  
  // Convert our 'ko', 'en', 'ja' to TMDB formats
  const tmdbLang = lang === 'ko' ? 'ko-KR' : lang === 'en' ? 'en-US' : 'ja-JP';
  const region = lang === 'ko' ? 'KR' : lang === 'en' ? 'US' : 'JP';
  
  return { language: tmdbLang, region };
};

/**
 * Next.js App Router에 최적화된 TMDB Fetch 래퍼 함수
 */
export const fetchTMDB = async (
  endpoint: string,
  extraParams: Record<string, string | number> = {}
) => {
  const params = { ...getParams(), ...extraParams };
  const searchParams = new URLSearchParams(
    Object.entries(params).map(([key, val]) => [key, String(val)])
  );

  const url = `${process.env.BASE_URL}${endpoint}?${searchParams.toString()}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`,
      // ⚠️ 이전의 강제 no-cache 헤더는 삭제했습니다.
    },
    // Next.js ISR 캐시 설정: 1시간(3600초) 동안 캐시를 유지하고 이후 백그라운드에서 갱신합니다.
    // 매번 새로 고침 시 API를 호출하지 않으면서도 비교적 최신 데이터를 유지할 수 있는 최적의 설정입니다.
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Fetch error: ${res.status}`);
  }

  return res.json();
};
