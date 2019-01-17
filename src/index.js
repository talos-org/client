// @flow
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';
import { render } from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';

import RootStore from 'stores/RootStore';

// Import stylesheet(s)
import 'index.less';

const root = document.getElementById('root');
const rootStore = new RootStore();

if (root != null) {
  render(
    <div>
      {/* Enable ONLY during debugging
      <DevTools /> */}
      <Router>
        <Provider rootStore={rootStore}>
          <App />
        </Provider>
      </Router>
    </div>,
    root,
  );
}

window.__APP_STATE__ = rootStore;

// Keep this
serviceWorker.unregister();
