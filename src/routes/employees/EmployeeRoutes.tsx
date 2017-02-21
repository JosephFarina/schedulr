import * as React from 'react'

import { Route, IndexRoute } from 'react-router'

import Employees from './Employees'
import EmployeeTable from './containers/EmployeeTable'
import EmployeeInspector from './containers/EmployeeInspector'
import NewEmployee from './containers/NewEmployee'

const EmployeeRoutes = (
  <Route path="employees" component={Employees}>
    <IndexRoute component={EmployeeTable} />
    <Route path="new" component={NewEmployee} />
    <Route path=":inspector" component={EmployeeInspector}></Route>
  </Route>
)

export default EmployeeRoutes
