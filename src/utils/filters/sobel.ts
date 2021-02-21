import { FilterFunc } from '../../types';
import GrayscaleFilter from './grayscale';
import MatrixFilter from './matrixFilter';

const kernelX = [
  [-1, 0, 1],
  [-2, 0, 2],
  [-1, 0, 1],
];

const kernelY = [
  [-1, -2, -1],
  [0, 0, 0],
  [1, 2, 1],
];

const convolutionMatrix = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
];

const SobelFilter: FilterFunc = (imageData) => {
  const grayscaled = GrayscaleFilter(imageData);
  return MatrixFilter(grayscaled, {
    matrix: convolutionMatrix,
    mediator: (pixels) => {
      const xValue = kernelX
        .flat()
        .reduce(
          (result, kernelValue, index) =>
            (result += kernelValue * pixels[index].red),
          0,
        );

      const yValue = kernelY
        .flat()
        .reduce(
          (result, kernelValue, index) =>
            (result += kernelValue * pixels[index].red),
          0,
        );

      const value = Math.sqrt(xValue ** 2 + yValue ** 2);
      return { red: value, green: value, blue: value, alpha: 255 };
    },
  });
};

export default SobelFilter;
