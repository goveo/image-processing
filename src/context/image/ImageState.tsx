import React, { useCallback, useMemo, useReducer } from 'react';

import { ImageContext, initialState } from './ImageContext';
import imageReducer from './ImageReducer';
import {
  ImageStateType,
  ImagePath,
  SET_IMAGE_PATH,
  SET_IMAGE_CANVAS,
} from './types';

const ImageState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    imageReducer,
    initialState as ImageStateType,
  );

  const setImagePath = useCallback((imagePath: ImagePath) => {
    dispatch({
      type: SET_IMAGE_PATH,
      payload: { imagePath },
    });
  }, []);

  const setImageCanvas = useCallback(
    (imageCanvas: HTMLCanvasElement | null) => {
      dispatch({
        type: SET_IMAGE_CANVAS,
        payload: { imageCanvas },
      });
    },
    [],
  );

  const providerValue = useMemo(
    () => ({ ...state, setImageCanvas, setImagePath }),
    [setImageCanvas, setImagePath, state],
  );

  return (
    <ImageContext.Provider value={providerValue}>
      {children}
    </ImageContext.Provider>
  );
};

export { ImageState };
