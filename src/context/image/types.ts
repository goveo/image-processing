import { Dispatch } from 'react';

export const SET_IMAGE_PATH = 'SET_IMAGE_PATH';
export const SET_IMAGE_CANVAS = 'SET_IMAGE_CANVAS';

export type ImagePath = string | null;

export interface ImageStateType {
  imagePath: ImagePath;
  imageCanvas: HTMLCanvasElement | null;
  setImagePath: (imagePath: ImagePath) => void;
  setImageCanvas: (imageCanvas: HTMLCanvasElement | null) => void;
}

export interface ContextModel {
  state: ImageStateType;
  dispatch: Dispatch<ImageAction>;
}

export interface SetImagePathAction {
  type: typeof SET_IMAGE_PATH;
  payload: {
    imagePath: ImagePath;
  };
}

export interface SetImageCanvasAction {
  type: typeof SET_IMAGE_CANVAS;
  payload: {
    imageCanvas: HTMLCanvasElement | null;
  };
}

export type ImageAction = SetImageCanvasAction | SetImagePathAction;
