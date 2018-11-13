// @flow
import React from 'react';
import { render } from 'react-dom';

import App from './routes/index';
import * as serviceWorker from './serviceWorker';
import { HomeContainer as Apple } from './containers/HomeContainer/index';

const root = document.getElementById('root');

if (root != null) {
  render(<Apple />, root);
}

// Keep this
serviceWorker.unregister();
