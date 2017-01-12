import { combineReducers } from 'redux'

import notification from './notification/reducer'
import sidebar from './sidebar/reducer'

const ui = combineReducers({
  sidebar,
  notification
})

export default ui
