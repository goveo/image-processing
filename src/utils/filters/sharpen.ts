import MatrixFilter from './matrixFilter';

const sharpenMatrix = [
  [-1, -1, -1],
  [-1, 9, -1],
  [-1, -1, -1],
];

const SharpenFilter = (imageData: ImageData): ImageData =>
  MatrixFilter(imageData, sharpenMatrix);

export default SharpenFilter;
