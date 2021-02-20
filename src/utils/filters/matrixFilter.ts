import { PixelComponent } from '../../types';
import bindPixelAt from '../bindPixelAt';
import getPixelIterator from '../getPixelIterator';

type FilterMediatorFunc = (iterationPixels: number[]) => number;
const defaultMediator: FilterMediatorFunc = (iterationPixels: number[]) => {
  return iterationPixels.reduce((a, b) => a + b, 0);
};

const MatrixFilter = (
  imageData: ImageData,
  matrix: number[][],
  div = 1,
  mediator = defaultMediator,
): ImageData => {
  if (matrix.length !== matrix[0].length) {
    throw new Error('Matrix must be square');
  }
  const { width, height, data } = imageData;
  const pixelAt = bindPixelAt(data, width);

  const getComponentValue = (
    x: number,
    y: number,
    pixelComponent: PixelComponent,
  ) => {
    const matrixWidth = matrix.length;
    const iterationPixels = new Array<number>(matrixWidth ** 2);

    for (let i = 0; i < matrixWidth; i++) {
      for (let j = 0; j < matrixWidth; j++) {
        const index = i * matrixWidth + j;
        const offset = Math.floor(matrixWidth / 2);
        iterationPixels[index] =
          pixelAt(x + i - offset, y + j - offset)[pixelComponent] *
          matrix[i][j];
      }
    }

    return mediator(iterationPixels) / div;
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

    const red = getComponentValue(x, y, 'red');
    const green = getComponentValue(x, y, 'green');
    const blue = getComponentValue(x, y, 'blue');
    const alpha = getComponentValue(x, y, 'alpha');

    filterData[redIndex] = red;
    filterData[greenIndex] = green;
    filterData[blueIndex] = blue;
    filterData[alphaIndex] = alpha;

    pixelData = pixelIterator.next();
  }

  return new ImageData(new Uint8ClampedArray(filterData), width, height);
};

export default MatrixFilter;
