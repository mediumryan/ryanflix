import { cookies } from 'next/headers';

export const getParams = () => {
  const cookieStore = cookies();
  const lang = cookieStore.get('language')?.value || 'ja';

  // Convert our 'ko', 'en', 'ja' to TMDB formats
  const tmdbLang = lang === 'ko' ? 'ko-KR' : lang === 'en' ? 'en-US' : 'ja-JP';
  const region = lang === 'ko' ? 'KR' : lang === 'en' ? 'US' : 'JP';

  return { language: tmdbLang, region };
};

export const fetchTMDB = async (
  endpoint: string,
  extraParams: Record<string, string | number> = {},
) => {
  try {
    const params = { ...getParams(), ...extraParams };
    const searchParams = new URLSearchParams(
      Object.entries(params).map(([key, val]) => [key, String(val)]),
    );

    const url = `${process.env.BASE_URL}${endpoint}?${searchParams.toString()}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Fetch error: ${res.status}`);
    }
    console.log('Fetched data from TMDB:', url);
    console.log('Response:', res);
    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getSearch = async (query: string) => {
  const res = await fetchTMDB('/search/multi', { query });
  return res.results;
};
