// export * from './action'
export * from './shifts'
export * from './employees'

import { combineReducers } from 'redux'
import shiftReducer from './shifts'

const entitiesReducer = combineReducers({
  shifts: shiftReducer
})

export default entitiesReducer
