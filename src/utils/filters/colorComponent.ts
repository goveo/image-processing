import { ColorComponent, FilterFunc } from '../../types';
import getPixelIterator from '../getPixelIterator';

const ColorComponentFilter: FilterFunc<ColorComponent> = (
  imageData,
  colorComponent,
) => {
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
    filteredData[alphaIndex] = alpha;

    switch (colorComponent) {
      case 'red':
        filteredData[redIndex] = red;
        filteredData[greenIndex] = 0;
        filteredData[blueIndex] = 0;
        break;
      case 'green':
        filteredData[redIndex] = 0;
        filteredData[greenIndex] = green;
        filteredData[blueIndex] = 0;
        break;
      case 'blue':
        filteredData[redIndex] = 0;
        filteredData[greenIndex] = 0;
        filteredData[blueIndex] = blue;
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

export default ColorComponentFilter;
