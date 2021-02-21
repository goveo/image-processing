import { FilterFunc, PixelComponent } from '../../types';
import MatrixFilter from './matrixFilter';

const e = NaN; // empty value

const dilationMatrix = [
  [e, e, 1, e, e],
  [e, 1, 1, 1, e],
  [1, 1, 1, 1, 1],
  [e, 1, 1, 1, e],
  [e, e, 1, e, e],
];

const DilationFilter: FilterFunc = (imageData) =>
  MatrixFilter(imageData, {
    matrix: dilationMatrix,
    mediator: (iterationPixels) => {
      const getPixelValue = (pixelComponent: PixelComponent) => {
        return Math.max(
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

export default DilationFilter;
