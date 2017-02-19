import * as React from 'react'

import { Provider } from 'react-redux'
import {
  Route,
  Router,
  browserHistory,
} from 'react-router'
import { syncHistoryWithStore, } from 'react-router-redux'

import {
  setClients,
  setEmployees,
  setLocations,
  setShifts,
  setPositions
} from 'src/state/entities'

import {
  clientsOne,
  employeesOne,
  locationsOne,
  positionsOne,
  generateShifts
} from 'src/testUtils'

import configureStore from './state/configureStore'
import Root from './Root'



/**
 * 
 * ROUTES
 * 
 */



// Scheduling
import NewShiftSideBar from 'src/routes/scheduling/components/NewShiftSideBar'
import Scheduling from 'src/routes/scheduling/Scheduling'


// Auth
import Auth from 'src/routes/auth/Auth'
import Login from 'src/routes/auth/containers/Login'
import Register from 'src/routes/auth/containers/Register'

// Account
import Employee from './routes/employees/Employees'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)


// if DEV ENV -- seed the redux store with mock data for development
store.dispatch((setClients(clientsOne) as any))
store.dispatch((setEmployees(employeesOne) as any))
store.dispatch((setLocations(locationsOne) as any))
store.dispatch((setPositions(positionsOne) as any))

const Routes = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Root} >

        <Route path="schedule" component={Scheduling}>
          <Route path="new-shift" components={{ sidebar: NewShiftSideBar }} />
        </Route>

        <Route path="auth" component={Auth} >
          <Route path="login" component={Login} />
          <Route path="register" component={Register} />
        </Route>

        <Route path="employees" component={Employee}></Route>

      </Route>
    </Router>
  </Provider>
)

export default Routes
