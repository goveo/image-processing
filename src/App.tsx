import '@fontsource/roboto';

import React from 'react';

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
