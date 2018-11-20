// @flow

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './routes/index';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');
root.style.height = '100%';

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
