import { combineReducers } from 'redux'

import calendar from './calendar/reducer'
import shift from './shift'
import ui from './ui'

const rootReducer = combineReducers({
  calendar,
  shift,
  ui
})

export default rootReducer
