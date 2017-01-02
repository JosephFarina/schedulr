import { combineReducers } from 'redux'

import calendar from './calendar/reducer'
import shifts from './shifts/reducer'

const rootReducer = combineReducers({
  calendar,
  shifts
})

export default rootReducer
