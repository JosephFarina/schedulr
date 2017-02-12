import { combineReducers } from 'redux'

import {
  routerReducer,
} from 'react-router-redux'

import auth from './auth'
import calendar from './calendar/reducer'
import entitiesReducer from './entities'
import shift from './shift'
import ui from './ui'


const rootReducer = combineReducers({
  calendar,
  shift,
  ui,
  entities: entitiesReducer,
  auth,
  routing: routerReducer
})

export default rootReducer
