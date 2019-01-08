// @flow
import { BrowserRouter as Router } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';
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
    <div>
      {/* Enable ONLY during debugging */}
      <DevTools />
      <Router>
        <Provider rootStore={new RootStore()}>
          <App />
        </Provider>
      </Router>
    </div>,
    root,
  );
}

// Keep this
serviceWorker.unregister();
