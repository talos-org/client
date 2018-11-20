// @flow
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './routes/index';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');

if (root != null) {
  render(
    <Router>
      <App />
    </Router>,
    root,
  );
}

// Keep this
serviceWorker.unregister();
