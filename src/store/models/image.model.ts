import { createModel } from '@rematch/core';

import { RootModel } from '../root.model';

export type ImagePath = string | null;

export type ImageState = {
  imagePath: ImagePath;
  imageCanvas: HTMLCanvasElement | null;
};

export const image = createModel<RootModel>()({
  state: {
    imagePath: null,
    imageCanvas: null,
  } as ImageState,
  reducers: {
    updateImagePath(state, payload: ImagePath) {
      return { ...state, imagePath: payload };
    },
    updateImageCanvas(state, payload: HTMLCanvasElement | null) {
      return { ...state, imageCanvas: payload };
    },
  },
  effects: (dispatch) => ({
    setImagePath(imagePath: ImagePath) {
      dispatch.image.updateImagePath(imagePath);
    },
    setImageCanvas(imageCanvas: HTMLCanvasElement | null) {
      dispatch.image.updateImageCanvas(imageCanvas);
    },
  }),
});
