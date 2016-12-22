import { combineReducers } from 'redux';

// delete after first reducer is created
const init = (state: any = {}, action: any) => {
  return state
}

const rootReducer = combineReducers({
  init
})

export default rootReducer
