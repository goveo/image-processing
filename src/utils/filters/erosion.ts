import { FilterFunc, PixelComponent } from '../../types';
import MatrixFilter from './matrixFilter';

const e = NaN; // empty value

const erosionMatrix = [
  [e, 1, e],
  [1, 1, 1],
  [e, 1, e],
];

const ErosionFilter: FilterFunc = (imageData) =>
  MatrixFilter(imageData, {
    matrix: erosionMatrix,
    mediator: (iterationPixels) => {
      const getPixelValue = (pixelComponent: PixelComponent) => {
        return Math.min(
          ...iterationPixels
            .map((pixel) => pixel[pixelComponent])
            .filter((value) => !isNaN(value)),
        );
      };

      return {
        red: getPixelValue('red'),
        green: getPixelValue('green'),
        blue: getPixelValue('blue'),
        alpha: getPixelValue('alpha'),
      };
    },
  });

export default ErosionFilter;
