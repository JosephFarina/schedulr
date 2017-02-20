import * as React from 'react'

import { Route, IndexRoute } from 'react-router'

import Employees from './Employees'
import EmployeeTable from './containers/EmployeeTable'
import EmployeeInspector from './containers/EmployeeInspector'

const EmployeeRoutes = (
  <Route path="employees" component={Employees}>
    <IndexRoute component={EmployeeTable} />
    <Route path=":inspector" component={EmployeeInspector}></Route>
  </Route>
)

export default EmployeeRoutes
