import { combineReducers } from 'redux'

import shiftReducer from './shifts'
import clientsReducer from './clients'
import employeeReducer from './employees'
import locationReducer from './locations'
import positionsReducer from './positions'

const entitiesReducer = combineReducers({
  shifts: shiftReducer,
  clients: clientsReducer,
  employees: employeeReducer,
  locations: locationReducer,
  positions: positionsReducer
})

export default entitiesReducer
export * from './positions'
export * from './shifts'
export * from './employees'
export * from './clients'
export * from './locations'
