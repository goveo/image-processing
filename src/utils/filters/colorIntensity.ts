import { ColorIntensityFilterFunc } from '../../types';
import getPixelIterator from '../getPixelIterator';

const ColorIntensityFilter: ColorIntensityFilterFunc = (
  imageData: ImageData,
  { colorComponent = 'red', intensity },
): ImageData => {
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
    filteredData[redIndex] = red;
    filteredData[greenIndex] = green;
    filteredData[blueIndex] = blue;
    filteredData[alphaIndex] = alpha;

    switch (colorComponent) {
      case 'red':
        filteredData[redIndex] = red + (intensity as number);
        break;
      case 'green':
        filteredData[greenIndex] = green + (intensity as number);
        break;
      case 'blue':
        filteredData[blueIndex] = blue + (intensity as number);
        break;
    }

    pixelData = pixelIterator.next();
  }

  return new ImageData(
    new Uint8ClampedArray(filteredData),
    imageData.width,
    imageData.height,
  );
};

export default ColorIntensityFilter;
