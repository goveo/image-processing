import { PixelData, Position } from '../types';
import getPixelIndexes from './getPixelIndexes';
import getPixelIterator from './getPixelIterator';

interface PixelDataSetters {
  setRed: (value: number) => void;
  setBlue: (value: number) => void;
  setGreen: (value: number) => void;
  setAlpha: (value: number) => void;
}

function* getPixelsFromCanvas(
  fromCanvas: HTMLCanvasElement,
  toCanvas: HTMLCanvasElement,
): IterableIterator<PixelData & PixelDataSetters & Position> {
  const fromCanvasContext = fromCanvas.getContext('2d');
  const toCanvasContext = toCanvas.getContext('2d');

  if (!fromCanvasContext || !toCanvasContext || !fromCanvas || !toCanvas) {
    throw new Error("Can't get canvas context");
  }

  const imageData = fromCanvasContext.getImageData(
    0,
    0,
    fromCanvas.width,
    fromCanvas.height,
  );

  const pixelIterator = getPixelIterator(imageData);
  let pixelData = pixelIterator.next();
  while (!pixelData.done) {
    const { x, y } = pixelData.value;
    const {
      red: redIndex,
      green: greenIndex,
      blue: blueIndex,
      alpha: alphaIndex,
    } = getPixelIndexes(x, y, imageData.width);

    const setRed = (value: number): void => {
      imageData.data[redIndex] = value;
    };

    const setGreen = (value: number): void => {
      imageData.data[greenIndex] = value;
    };

    const setBlue = (value: number): void => {
      imageData.data[blueIndex] = value;
    };

    const setAlpha = (value: number): void => {
      imageData.data[alphaIndex] = value;
    };

    yield {
      ...pixelData.value,
      setRed,
      setBlue,
      setGreen,
      setAlpha,
    };

    pixelData = pixelIterator.next();
  }

  toCanvas.height = fromCanvas.height;
  toCanvas.width = fromCanvas.width;
  toCanvasContext.putImageData(imageData, 0, 0);
}

export default getPixelsFromCanvas;
