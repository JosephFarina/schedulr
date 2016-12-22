import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './containers/Root';
import './index.css';

import configureStore from './state/configureStore'

const store = configureStore()

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(
  <Root store={store} />,
  root
);
