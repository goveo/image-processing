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

export type Filter =
  | 'sobel'
  | 'median'
  | 'sharpen'
  | 'blur'
  | 'erosion'
  | 'dilation'
  | 'grayscale';

export type FilterMediatorFunc = (
  iterationPixels: PixelData[],
  currentPixel: PixelData,
) => PixelData;

export interface MatrixFilterOptions {
  matrix: number[][];
  div: number;
  mediator: FilterMediatorFunc;
}

export interface ColorComponentFilterOptions {
  colorComponent: ColorComponent;
}

export type InvertFilterOptions = void;

export interface ColorIntensityFilterOptions {
  colorComponent: ColorComponent;
  intensity: number;
}

export type FilterOptions =
  | MatrixFilterOptions
  | ColorComponentFilterOptions
  | InvertFilterOptions
  | ColorIntensityFilterOptions;

export type FilterFunc<F extends FilterOptions> = (
  imageData: ImageData,
  filterOptions: Partial<F>,
) => ImageData;

export type MatrixFilterFunc = FilterFunc<MatrixFilterOptions>;
export type ColorComponentFilterFunc = FilterFunc<ColorComponentFilterOptions>;
export type InvertFilterFunc = FilterFunc<InvertFilterOptions>;
export type ColorIntensityFilterFunc = FilterFunc<ColorIntensityFilterOptions>;
