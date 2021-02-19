import { PixelData, PixelOffsets } from '../types';

const getPixelIndexes = (
  x: number,
  y: number,
  imageWidth: number,
): PixelData => {
  const i = x * 4 + y * imageWidth * 4;

  return {
    red: i + PixelOffsets.red,
    green: i + PixelOffsets.green,
    blue: i + PixelOffsets.blue,
    alpha: i + PixelOffsets.alpha,
  };
};

export default getPixelIndexes;
