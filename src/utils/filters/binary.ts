import { FilterFunc } from '../../types';
import getPixelIterator from '../getPixelIterator';

const BinaryFilter: FilterFunc = (imageData) => {
  const pixelIterator = getPixelIterator(imageData);
  const filteredData = new Array<number>(imageData.data.length);

  let pixelData = pixelIterator.next();
  while (!pixelData.done) {
    const {
      alpha,
      redIndex,
      greenIndex,
      blueIndex,
      alphaIndex,
    } = pixelData.value;
    filteredData[redIndex] = 0;
    filteredData[greenIndex] = 0;
    filteredData[blueIndex] = 0;
    filteredData[alphaIndex] = alpha > 128 ? 255 : 0;

    pixelData = pixelIterator.next();
  }

  return new ImageData(
    new Uint8ClampedArray(filteredData),
    imageData.width,
    imageData.height,
  );
};

export default BinaryFilter;
