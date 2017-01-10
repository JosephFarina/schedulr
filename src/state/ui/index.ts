import { combineReducers } from 'redux'

import sidebar from './sidebar/reducer'
import alert from './alert/reducer'

const ui = combineReducers({
  sidebar,
  alert
})

export default ui
