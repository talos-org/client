// @flow
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { render } from 'react-dom';

import App from 'screens/Root';
import * as serviceWorker from './serviceWorker';

// Import stylesheet(s)
import 'index.less';

// TODO: I usually set these defaults for all my
// apps. But now that we’re using Less, maybe we can
// just set these in the global default `index.less`?
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  *::after,*::before {
    box-sizing: initial;
  }
  html {
    margin: 0;
    padding: 0;
  }
`;

const root = document.getElementById('root');

if (root != null) {
  render(
    <div>
      <GlobalStyle />
      <Router>
        <App />
      </Router>
    </div>,
    root,
  );
}

// Keep this
serviceWorker.unregister();
