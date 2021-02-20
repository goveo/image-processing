import { PixelComponent } from '../../types';
import MatrixFilter from './matrixFilter';

const MedianFilter = (imageData: ImageData, matrixOffset = 1): ImageData => {
  if (!Number.isInteger(matrixOffset) || matrixOffset < 1) {
    throw new Error('Wrong median matrix offset');
  }

  const getMatrix = (): number[][] => {
    const matrixSize = matrixOffset * 2 + 1;
    return new Array(matrixSize)
      .fill(1)
      .map(() => new Array(matrixSize).fill(1));
  };

  return MatrixFilter(imageData, {
    matrix: getMatrix(),
    mediator: (iterationPixels) => {
      const getPixelValue = (pixelComponent: PixelComponent) => {
        const redPixels = iterationPixels.map((pixel) => pixel[pixelComponent]);
        redPixels.sort((a, b) => a - b);
        return redPixels[Math.floor(redPixels.length / 2)];
      };

      return {
        red: getPixelValue('red'),
        green: getPixelValue('green'),
        blue: getPixelValue('blue'),
        alpha: getPixelValue('alpha'),
      };
    },
  });
};

export default MedianFilter;
