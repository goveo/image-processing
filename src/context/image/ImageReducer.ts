import {
  ImageAction,
  ImageStateType,
  SET_IMAGE_CANVAS,
  SET_IMAGE_PATH,
} from './types';

export default (state: ImageStateType, action: ImageAction): ImageStateType => {
  switch (action.type) {
    case SET_IMAGE_PATH:
      return {
        ...state,
        imagePath: action.payload.imagePath,
      };
    case SET_IMAGE_CANVAS:
      return {
        ...state,
        imageCanvas: action.payload.imageCanvas,
      };
    default:
      return state;
  }
};
