import * as React from 'react'

import { Provider } from 'react-redux'
import {
  IndexRoute,
  Route,
  Router,
  browserHistory,
} from 'react-router'
import { syncHistoryWithStore, } from 'react-router-redux'

import configureStore from './state/configureStore'
import Root from 'src/shared/components/Root'

/**
 * 
 * ROUTES
 * 
 */

import Inspector from 'src/routes/scheduling/containers/Inspector'
import NewShiftSideBar from 'src/routes/scheduling/containers/NewShiftSideBar'
import Scheduling from 'src/routes/scheduling/Scheduling'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

const Routes = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Root} >

        <Route path="scheduling" component={Scheduling}>
          <Route path="new-shift" components={{ sidebar: NewShiftSideBar }} />
          <Route path="inspect" components={{ sidebar: Inspector }} />
        </Route>

      </Route>
    </Router>
  </Provider>
)

export default Routes
