import { FilterFunc } from '../../types';
import MatrixFilter from './matrixFilter';

const blurMatrix = [
  [0.000789, 0.006581, 0.013347, 0.006581, 0.000789],
  [0.006581, 0.054901, 0.111345, 0.054901, 0.006581],
  [0.013347, 0.111345, 0.225821, 0.111345, 0.013347],
  [0.006581, 0.054901, 0.111345, 0.054901, 0.006581],
  [0.000789, 0.006581, 0.013347, 0.006581, 0.000789],
];

const BlurFilter: FilterFunc = (imageData: ImageData): ImageData =>
  MatrixFilter(imageData, {
    matrix: blurMatrix,
  });

export default BlurFilter;
