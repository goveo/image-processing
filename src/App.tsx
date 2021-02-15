import React from 'react';

import '@fontsource/roboto';

import AppContainer from './AppContainer';
import { ImageState } from './context/image/ImageState';

const App: React.FC = () => {
  return (
    <ImageState>
      <AppContainer />
    </ImageState>
  );
};

export default App;
