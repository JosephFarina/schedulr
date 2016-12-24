require('normalize.css/normalize.css')
require('./index.css')

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Root from './containers/Root'

import configureStore from './state/configureStore'

const store = configureStore()

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(
  <Root store={store} />,
  root
)
