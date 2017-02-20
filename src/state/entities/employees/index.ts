import { combineReducers } from 'redux'

import employeeCrudReducer from './crud'
import employeeInspectorReducer from './inspector'

const employeeReducer = combineReducers({
  crud: employeeCrudReducer,
  inspector: employeeInspectorReducer
})

export default employeeReducer
export * from './crud'
export * from './inspector'
