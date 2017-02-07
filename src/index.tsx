require('normalize.css/normalize.css')
require('./index.css')

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Routes from './routes'

const root = document.createElement('div')
root.id = 'mainContainer'
document.body.appendChild(root)

ReactDOM.render(
  <Routes />,
  root
)
