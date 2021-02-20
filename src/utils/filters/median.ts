import { PixelComponent } from '../../types';
import bindPixelAt from '../bindPixelAt';
import getPixelIterator from '../getPixelIterator';

const MedianFilter = (
  imageData: ImageData,
  medianMatrixSize = 1,
): ImageData => {
  if (!Number.isInteger(medianMatrixSize) || medianMatrixSize < 1) {
    throw new Error('Wrong median matrix size');
  }
  const { width, height, data } = imageData;
  const pixelAt = bindPixelAt(data, width);

  const getMedianValue = (
    x: number,
    y: number,
    pixelComponent: PixelComponent,
  ) => {
    const matrixWidth = medianMatrixSize * 2 + 1;
    const arraySize = matrixWidth ** 2;
    const result = new Array<number>(arraySize);

    for (let i = 0; i < matrixWidth; i++) {
      for (let j = 0; j < matrixWidth; j++) {
        const index = i * matrixWidth + j;
        result[index] = pixelAt(
          x + i - medianMatrixSize,
          y + j - medianMatrixSize,
        )[pixelComponent];
      }
    }
    result.sort((a, b) => a - b);

    return result[Math.round(result.length / 2)];
  };

  const filterData = new Array<number>(imageData.data.length);
  const pixelIterator = getPixelIterator(imageData);
  let pixelData = pixelIterator.next();
  while (!pixelData.done) {
    const {
      x,
      y,
      redIndex,
      greenIndex,
      blueIndex,
      alphaIndex,
    } = pixelData.value;

    const red = getMedianValue(x, y, 'red');
    const green = getMedianValue(x, y, 'green');
    const blue = getMedianValue(x, y, 'blue');
    const alpha = getMedianValue(x, y, 'alpha');

    filterData[redIndex] = red;
    filterData[greenIndex] = green;
    filterData[blueIndex] = blue;
    filterData[alphaIndex] = alpha;

    pixelData = pixelIterator.next();
  }

  return new ImageData(new Uint8ClampedArray(filterData), width, height);
};

export default MedianFilter;
