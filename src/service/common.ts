import { fetchTMDB } from '@/service/index';

// search tv & movie
export const getSearch = async (query: string) => {
  return fetchTMDB('/search/multi', { query });
};
