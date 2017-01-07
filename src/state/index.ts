import { combineReducers } from 'redux'

import calendar from './calendar/reducer'
import entities from './entities/reducer'
import shift from './shift'
import ui from './ui'

const rootReducer = combineReducers({
  calendar,
  shift,
  ui,
  entities
})

export default rootReducer
