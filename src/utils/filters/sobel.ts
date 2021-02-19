import bindPixelAt from '../ bindPixelAt';

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

const SobelFilter = (imageData: ImageData): ImageData => {
  const { width, height, data } = imageData;
  const filterData: number[] = [];
  const pixelAt = bindPixelAt(data, width);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelX =
        kernelX[0][0] * pixelAt(x - 1, y - 1) +
        kernelX[0][1] * pixelAt(x, y - 1) +
        kernelX[0][2] * pixelAt(x + 1, y - 1) +
        kernelX[1][0] * pixelAt(x - 1, y) +
        kernelX[1][1] * pixelAt(x, y) +
        kernelX[1][2] * pixelAt(x + 1, y) +
        kernelX[2][0] * pixelAt(x - 1, y + 1) +
        kernelX[2][1] * pixelAt(x, y + 1) +
        kernelX[2][2] * pixelAt(x + 1, y + 1);

      const pixelY =
        kernelY[0][0] * pixelAt(x - 1, y - 1) +
        kernelY[0][1] * pixelAt(x, y - 1) +
        kernelY[0][2] * pixelAt(x + 1, y - 1) +
        kernelY[1][0] * pixelAt(x - 1, y) +
        kernelY[1][1] * pixelAt(x, y) +
        kernelY[1][2] * pixelAt(x + 1, y) +
        kernelY[2][0] * pixelAt(x - 1, y + 1) +
        kernelY[2][1] * pixelAt(x, y + 1) +
        kernelY[2][2] * pixelAt(x + 1, y + 1);

      const magnitude = Math.sqrt(pixelX ** 2 + pixelY ** 2);

      filterData.push(magnitude, magnitude, magnitude, 255);
    }
  }

  return new ImageData(new Uint8ClampedArray(filterData), width, height);
};

export default SobelFilter;
