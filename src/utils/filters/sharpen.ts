import { FilterFunc } from '../../types';
import MatrixFilter from './matrixFilter';

const sharpenMatrix = [
  [-1, -1, -1],
  [-1, 9, -1],
  [-1, -1, -1],
];

const SharpenFilter: FilterFunc = (imageData) =>
  MatrixFilter(imageData, {
    matrix: sharpenMatrix,
  });

export default SharpenFilter;
