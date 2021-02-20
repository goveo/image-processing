import bindPixelAt from '../bindPixelAt';
import getPixelIterator from '../getPixelIterator';

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
  const pixelAt = bindPixelAt(data, width);

  const filterData = new Array<number>(imageData.data.length);
  const pixelIterator = getPixelIterator(imageData);
  let pixelData = pixelIterator.next();
  while (!pixelData.done) {
    const {
      x,
      y,
      redIndex,
      greenIndex,
      blueIndex,
      alphaIndex,
    } = pixelData.value;

    const pixelX =
      kernelX[0][0] * pixelAt(x - 1, y - 1).red +
      kernelX[0][1] * pixelAt(x, y - 1).red +
      kernelX[0][2] * pixelAt(x + 1, y - 1).red +
      kernelX[1][0] * pixelAt(x - 1, y).red +
      kernelX[1][1] * pixelAt(x, y).red +
      kernelX[1][2] * pixelAt(x + 1, y).red +
      kernelX[2][0] * pixelAt(x - 1, y + 1).red +
      kernelX[2][1] * pixelAt(x, y + 1).red +
      kernelX[2][2] * pixelAt(x + 1, y + 1).red;

    const pixelY =
      kernelY[0][0] * pixelAt(x - 1, y - 1).red +
      kernelY[0][1] * pixelAt(x, y - 1).red +
      kernelY[0][2] * pixelAt(x + 1, y - 1).red +
      kernelY[1][0] * pixelAt(x - 1, y).red +
      kernelY[1][1] * pixelAt(x, y).red +
      kernelY[1][2] * pixelAt(x + 1, y).red +
      kernelY[2][0] * pixelAt(x - 1, y + 1).red +
      kernelY[2][1] * pixelAt(x, y + 1).red +
      kernelY[2][2] * pixelAt(x + 1, y + 1).red;

    const magnitude = Math.sqrt(pixelX ** 2 + pixelY ** 2);

    filterData[redIndex] = magnitude;
    filterData[greenIndex] = magnitude;
    filterData[blueIndex] = magnitude;
    filterData[alphaIndex] = 255;

    pixelData = pixelIterator.next();
  }

  return new ImageData(new Uint8ClampedArray(filterData), width, height);
};

export default SobelFilter;
