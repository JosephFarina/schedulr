import { combineReducers } from 'redux'

import shiftReducer from './shifts'
import clientsReducer from './clients'
import employeeReducer from './employees'
import locationReducer from './locations'

const entitiesReducer = combineReducers({
  shifts: shiftReducer,
  clients: clientsReducer,
  employees: employeeReducer,
  locations: locationReducer
})

export default entitiesReducer
export * from './shifts'
export * from './employees'
export * from './clients'
export * from './locations'
