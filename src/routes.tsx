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


// Scheduling
import NewShiftSideBar from 'src/routes/scheduling/containers/NewShiftSideBar'
import Scheduling from 'src/routes/scheduling/Scheduling'

// Auth
import Auth from 'src/routes/auth/Auth'
import Login from 'src/routes/auth/containers/Login'
import Register from 'src/routes/auth/containers/Register'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

const Routes = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Root} >

        <Route path="scheduling" component={Scheduling}>
          <Route path="new-shift" components={{ sidebar: NewShiftSideBar }} />
        </Route>

        <Route path="auth" component={Auth} >
          <Route path="login" component={Login} />
          <Route path="register" component={Register} />
        </Route>

      </Route>
    </Router>
  </Provider>
)

export default Routes
