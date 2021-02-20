import bindPixelAt from '../ bindPixelAt';
import { PixelComponent } from '../../types';

const MatrixFilter = (imageData: ImageData, matrix: number[][]): ImageData => {
  if (matrix.length !== matrix[0].length) {
    throw new Error('Matrix must be square');
  }
  const { width, height, data } = imageData;
  const filterData: number[] = [];
  const pixelAt = bindPixelAt(data, width);

  const getComponentValue = (
    x: number,
    y: number,
    pixelComponent: PixelComponent,
  ) => {
    let result = 0;

    const matrixWidth = matrix.length;
    for (let i = 0; i < matrixWidth; i++) {
      for (let j = 0; j < matrixWidth; j++) {
        const offset = Math.floor(matrixWidth / 2);
        result +=
          pixelAt(x + i - offset, y + j - offset)[pixelComponent] *
          matrix[i][j];
      }
    }

    return result;
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const red = getComponentValue(x, y, 'red');
      const green = getComponentValue(x, y, 'green');
      const blue = getComponentValue(x, y, 'blue');
      filterData.push(red, green, blue, 255);
    }
  }

  return new ImageData(new Uint8ClampedArray(filterData), width, height);
};

export default MatrixFilter;
