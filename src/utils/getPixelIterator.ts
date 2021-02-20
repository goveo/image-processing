import { PixelData, Position } from '../types';
import getPixelIndexes from './getPixelIndexes';

interface PixelIndexes {
  redIndex: number;
  greenIndex: number;
  blueIndex: number;
  alphaIndex: number;
}

function* getPixelIterator(
  imageData: ImageData,
): IterableIterator<PixelData & Position & PixelIndexes> {
  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      const {
        red: redIndex,
        green: greenIndex,
        blue: blueIndex,
        alpha: alphaIndex,
      } = getPixelIndexes(x, y, imageData.width);

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
