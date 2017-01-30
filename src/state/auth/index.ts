import { combineReducers } from 'redux'

import login from './login'

const auth = combineReducers({
  login
})

export default auth
