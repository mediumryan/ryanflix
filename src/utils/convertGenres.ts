import { movieGenresMap } from '@/service/genre';

export const convertGenres = (genreIds: number[], lang: string = 'ja') => {
  const map = movieGenresMap[lang] || movieGenresMap['ja'];
  
  if (genreIds.length > 3) {
    return genreIds
      .slice(0, 3)
      .map((id) => map[id] || 'Unknown')
      .join(', ');
  }
  return genreIds
    .map((id) => map[id] || 'Unknown')
    .join(', ');
};
