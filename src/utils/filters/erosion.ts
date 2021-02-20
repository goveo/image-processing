import MatrixFilter from './matrixFilter';

const e = NaN; // empty value

const erosionMatrix = [
  [e, 1, e],
  [1, 1, 1],
  [e, 1, e],
];

const ErosionFilter = (imageData: ImageData): ImageData =>
  MatrixFilter(imageData, erosionMatrix, 1, (iterationPixels) => {
    return Math.min(...iterationPixels.filter((value) => !isNaN(value)));
  });

export default ErosionFilter;
