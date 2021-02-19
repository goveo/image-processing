import { PixelComponent, PixelOffsets } from '../types';

const bindPixelAt = (data: Uint8ClampedArray, width: number) => {
  return (
    x: number,
    y: number,
    pixelComponent: PixelComponent = 'red',
  ): number => {
    return data[(width * y + x) * 4 + PixelOffsets[pixelComponent]];
  };
};

export default bindPixelAt;
