import { fetchTMDB } from '@/service/common';
import { getAiringTodayTvShows } from '@/service/tvShowService';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { keyword: string } },
) {
  const keywordValue = params.keyword;

  try {
    const newData = await fetchTMDB('/search/multi', { keywordValue });
    return Response.json(newData);
  } catch (err: any) {
    console.error(err.message);
    return Response.json([]);
  }
}
