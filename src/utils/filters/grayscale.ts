import { FilterFunc } from '../../types';
import MatrixFilter from './matrixFilter';

const GrayscaleFilter: FilterFunc = (imageData) =>
  MatrixFilter(imageData, {
    mediator: (iterationPixels, currentPixel) => {
      const avgColor =
        (currentPixel.red + currentPixel.green + currentPixel.blue) / 3;
      return {
        red: avgColor,
        green: avgColor,
        blue: avgColor,
        alpha: currentPixel.alpha,
      };
    },
  });

export default GrayscaleFilter;
