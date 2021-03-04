import '@fontsource/roboto';

import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import AppContainer from './AppContainer';
import { store } from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppContainer />
      </HashRouter>
    </Provider>
  );
};

export default App;
