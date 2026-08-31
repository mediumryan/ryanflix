import { getNowPlayingMovies } from '@/service/movieService';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { page: string } },
) {
  const pageValue = params.page;

  try {
    const newData = await getNowPlayingMovies(Number(pageValue));
    return Response.json(newData);
  } catch (err: any) {
    console.error(err.message);
    return Response.json([]);
  }
}
