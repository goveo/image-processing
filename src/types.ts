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

export type Filter = 'sobel' | 'median';
