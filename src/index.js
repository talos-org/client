// @flow
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { Provider } from 'mobx-react';
import { render } from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

import RootStore from 'stores/RootStore';

// Import stylesheet(s)
import 'index.less';

const root = document.getElementById('root');

if (root != null) {
  render(
    <Router>
      <Provider rootStore={new RootStore()}>
        <App />
      </Provider>
    </Router>,
    root,
  );
}

// Keep this
serviceWorker.unregister();
