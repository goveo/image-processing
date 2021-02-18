const getPixelIndexes = (
  x: number,
  y: number,
  imageWidth: number,
): {
  red: number;
  green: number;
  blue: number;
  alpha: number;
} => {
  const i = x * 4 + y * imageWidth * 4;

  return {
    red: i,
    green: i + 1,
    blue: i + 2,
    alpha: i + 3,
  };
};

export default getPixelIndexes;
