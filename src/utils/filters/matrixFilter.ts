import { FilterFunc, PixelComponent, PixelData } from '../../types';
import bindPixelAt from '../bindPixelAt';
import getPixelIterator from '../getPixelIterator';

const multiplyPixelByValue = (pixel: PixelData, value: number): PixelData => {
  return {
    red: pixel.red * value,
    green: pixel.green * value,
    blue: pixel.blue * value,
    alpha: pixel.alpha * value,
  };
};

type FilterMediatorFunc = (
  iterationPixels: PixelData[],
  currentPixel: PixelData,
) => PixelData;

interface MatrixFilterOptions {
  matrix: number[][];
  div: number;
  mediator: FilterMediatorFunc;
}

const defaultOptions: MatrixFilterOptions = {
  matrix: [[1]],
  div: 1,
  mediator: (iterationPixels) => {
    const getPixel = (pixelComponent: PixelComponent) => {
      return iterationPixels.reduce(
        (result, pixel) => result + pixel[pixelComponent],
        0,
      );
    };

    return {
      red: getPixel('red'),
      green: getPixel('green'),
      blue: getPixel('blue'),
      alpha: getPixel('alpha'),
    };
  },
};

const MatrixFilter: FilterFunc<Partial<MatrixFilterOptions>> = (
  imageData,
  options,
) => {
  const matrix = options?.matrix ?? defaultOptions.matrix;
  const div = options?.div ?? defaultOptions.div;
  const mediator = options?.mediator ?? defaultOptions.mediator;

  if (matrix.length !== matrix[0].length) {
    throw new Error('Matrix must be square');
  }
  const { width, height, data } = imageData;
  const pixelAt = bindPixelAt(data, width);

  const getPixelValue = (x: number, y: number) => {
    const matrixWidth = matrix.length;
    const iterationPixels = new Array<PixelData>(matrixWidth ** 2);

    for (let i = 0; i < matrixWidth; i++) {
      for (let j = 0; j < matrixWidth; j++) {
        const index = i * matrixWidth + j;
        const offset = Math.floor(matrixWidth / 2);
        iterationPixels[index] = {
          red: pixelAt(x + i - offset, y + j - offset).red * matrix[i][j],
          green: pixelAt(x + i - offset, y + j - offset).green * matrix[i][j],
          blue: pixelAt(x + i - offset, y + j - offset).blue * matrix[i][j],
          alpha: pixelAt(x + i - offset, y + j - offset).alpha * matrix[i][j],
        };
      }
    }

    const resultPixel = mediator(iterationPixels, pixelAt(x, y));

    return multiplyPixelByValue(resultPixel, 1 / div);
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

    const pixel = getPixelValue(x, y);

    filterData[redIndex] = pixel.red;
    filterData[greenIndex] = pixel.green;
    filterData[blueIndex] = pixel.blue;
    filterData[alphaIndex] = pixel.alpha;

    pixelData = pixelIterator.next();
  }

  return new ImageData(new Uint8ClampedArray(filterData), width, height);
};

export default MatrixFilter;
