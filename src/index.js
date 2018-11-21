// @flow
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { render } from 'react-dom';

import App from './routes/index';
import * as serviceWorker from './serviceWorker';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  *::after,before {
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
