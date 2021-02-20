import MatrixFilter from './matrixFilter';

const e = NaN; // empty value

const dilationMatrix = [
  [e, e, 1, e, e],
  [e, 1, 1, 1, e],
  [1, 1, 1, 1, 1],
  [e, 1, 1, 1, e],
  [e, e, 1, e, e],
];

const DilationFilter = (imageData: ImageData): ImageData =>
  MatrixFilter(imageData, dilationMatrix, 1, (iterationPixels) => {
    return Math.max(...iterationPixels.filter((value) => !isNaN(value)));
  });

export default DilationFilter;
