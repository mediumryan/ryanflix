import { getAiringTodayTvShows } from '@/service/tvShowService';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { page: string } },
) {
  const pageValue = params.page;

  try {
    const newData = await getAiringTodayTvShows(Number(pageValue));
    return Response.json(newData);
  } catch (err: any) {
    console.error(err.message);
    return Response.json([]);
  }
}
