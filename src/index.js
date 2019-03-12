// @flow
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';

import * as serviceWorker from './serviceWorker';
import App from './App';

import RootStore from 'stores/RootStore';

// Import styles / themes
import 'index.less';
import theme from './theme';

const root = document.getElementById('root');
const rootStore = new RootStore();

if (root != null) {
  render(
    <div>
      {/* Enable DevTools ONLY during debugging */}
      {/*<DevTools />*/}
      <Router>
        <Provider rootStore={rootStore}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Provider>
      </Router>
    </div>,
    root,
  );
}

window.__APP_STATE__ = rootStore;

// Keep this
serviceWorker.unregister();
