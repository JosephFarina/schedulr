import * as React from 'react'

import {
  Route,
  Router,
  browserHistory
} from 'react-router'

import {
  syncHistoryWithStore,
} from 'react-router-redux'

import Scheduling from 'src/routes/scheduling/containers/Scheduling'
import Root from 'src/shared/components/Root'

import { Provider } from 'react-redux'

import configureStore from './state/configureStore'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

const Routes = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Root} >
        <Route path="schedule" component={Scheduling} ></Route>
      </Route>
    </Router >
  </Provider>
)

export default Routes
