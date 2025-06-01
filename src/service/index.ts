export const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${process.env.API_KEY}`,
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
};

export const params = { language: 'ja-JP', page: 1, region: 'JP' };
