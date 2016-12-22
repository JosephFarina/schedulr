import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(
  <App />,
  root
);
