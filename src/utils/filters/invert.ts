import { FilterFunc } from '../../types';
import getPixelIterator from '../getPixelIterator';

const InvertFilter: FilterFunc = (imageData) => {
  const pixelIterator = getPixelIterator(imageData);
  const filteredData = new Array<number>(imageData.data.length);

  let pixelData = pixelIterator.next();
  while (!pixelData.done) {
    const {
      red,
      green,
      blue,
      alpha,
      redIndex,
      greenIndex,
      blueIndex,
      alphaIndex,
    } = pixelData.value;
    filteredData[redIndex] = red ^ 255;
    filteredData[greenIndex] = green ^ 255;
    filteredData[blueIndex] = blue ^ 255;
    filteredData[alphaIndex] = alpha;

    pixelData = pixelIterator.next();
  }

  return new ImageData(
    new Uint8ClampedArray(filteredData),
    imageData.width,
    imageData.height,
  );
};

export default InvertFilter;
