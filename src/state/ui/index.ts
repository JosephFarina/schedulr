import { combineReducers } from 'redux'

import modal from './modal/reducer'
import notification from './notification/reducer'
import sidebar from './sidebar/reducer'

const ui = combineReducers({
  sidebar,
  notification,
  modal
})

export default ui
