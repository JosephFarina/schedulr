import { combineReducers } from 'redux'

import calendar from './calendar/reducer'
import shifts from './shifts/reducer'
import ui from './ui'

const rootReducer = combineReducers({
  calendar,
  shifts,
  ui
})

export default rootReducer
