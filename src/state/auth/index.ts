import { combineReducers } from 'redux'

import login from './login'
import register from './register'

const auth = combineReducers({
  login,
  register
})

export default auth
