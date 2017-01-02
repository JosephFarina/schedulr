import { combineReducers } from 'redux'

import sidebar from './sidebar/reducer'

const ui = combineReducers({
  sidebar
})

export default ui
