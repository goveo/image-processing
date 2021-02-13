import React from 'react';

import type { ImageStateType } from './types';

export const initialState: Partial<ImageStateType> = {
  imagePath: null,
};

export const ImageContext = React.createContext(initialState as ImageStateType);
