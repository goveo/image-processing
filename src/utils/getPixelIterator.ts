import { PixelData, PixelOffsets, Position } from '../types';

interface PixelIndexes {
  redIndex: number;
  greenIndex: number;
  blueIndex: number;
  alphaIndex: number;
}

const getPixelIndexes = (
  x: number,
  y: number,
  imageWidth: number,
): PixelIndexes => {
  const i = x * 4 + y * imageWidth * 4;

  return {
    redIndex: i + PixelOffsets.red,
    greenIndex: i + PixelOffsets.green,
    blueIndex: i + PixelOffsets.blue,
    alphaIndex: i + PixelOffsets.alpha,
  };
};

function* getPixelIterator(
  imageData: ImageData,
): IterableIterator<PixelData & Position & PixelIndexes> {
  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      const { redIndex, greenIndex, blueIndex, alphaIndex } = getPixelIndexes(
        x,
        y,
        imageData.width,
      );

      yield {
        x,
        y,
        red: imageData.data[redIndex],
        green: imageData.data[greenIndex],
        blue: imageData.data[blueIndex],
        alpha: imageData.data[alphaIndex],
        redIndex,
        greenIndex,
        blueIndex,
        alphaIndex,
      };
    }
  }
}

export default getPixelIterator;
