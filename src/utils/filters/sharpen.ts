import MatrixFilter from './matrixFilter';

const sharpenMatrix = [
  [0, 0, 0, 0, 0],
  [0, -1, -1, -1, 0],
  [0, -1, 9, -1, 0],
  [0, -1, -1, -1, 0],
  [0, 0, 0, 0, 0],
];

const SharpenFilter = (imageData: ImageData): ImageData =>
  MatrixFilter(imageData, sharpenMatrix);

export default SharpenFilter;
