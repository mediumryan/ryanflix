export const getImages = (poster_path: string, size?: string) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}${
    size ? size : 'original'
  }/${poster_path}`;
};
