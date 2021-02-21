export type ColorComponent = 'red' | 'green' | 'blue';
export type PixelComponent = ColorComponent | 'alpha';
export const PixelOffsets: Record<PixelComponent, number> = {
  red: 0,
  green: 1,
  blue: 2,
  alpha: 3,
};
export interface PixelData {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}
export interface Position {
  x: number;
  y: number;
}

export enum MatrixFilter {
  Sobel = 'sobel',
  Median = 'median',
  Sharpen = 'sharpen',
  Blur = 'blur',
  Erosion = 'erosion',
  Dilation = 'dilation',
}

export type FilterFunc<F extends unknown | void = void> = (
  imageData: ImageData,
  filterOptions: F,
) => ImageData;
