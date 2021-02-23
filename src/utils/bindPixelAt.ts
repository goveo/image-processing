import { PixelData, PixelOffsets } from '../types';

const bindPixelAt = ({ data, width }: ImageData) => {
  return (x: number, y: number): PixelData => {
    const index = (width * y + x) * 4;
    return {
      red: data[index + PixelOffsets.red],
      green: data[index + PixelOffsets.green],
      blue: data[index + PixelOffsets.blue],
      alpha: data[index + PixelOffsets.alpha],
    };
  };
};

export default bindPixelAt;
