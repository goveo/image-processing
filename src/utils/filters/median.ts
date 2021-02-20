import bindPixelAt from '../ bindPixelAt';
import { PixelComponent } from '../../types';

const MedianFilter = (
  imageData: ImageData,
  medianMatrixSize = 1,
): ImageData => {
  if (!Number.isInteger(medianMatrixSize) || medianMatrixSize < 1) {
    throw new Error('Wrong median matrix size');
  }
  const { width, height, data } = imageData;
  const filterData: number[] = [];
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

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const red = getMedianValue(x, y, 'red');
      const green = getMedianValue(x, y, 'green');
      const blue = getMedianValue(x, y, 'blue');
      filterData.push(red, green, blue, 255);
    }
  }

  return new ImageData(new Uint8ClampedArray(filterData), width, height);
};

export default MedianFilter;
