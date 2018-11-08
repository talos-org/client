// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';

import * as serviceWorker from './serviceWorker';
import { HomeContainer as App } from './containers/HomeContainer/index';

import 'antd/dist/antd.css';

const root = document.getElementById('root');

if (root != null) {
  render(<App />, root);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
