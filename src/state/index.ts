import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

const init = (state: any = {}, action: any) => {
  return state
}

const rootReducer = combineReducers({
  init
})

export default rootReducer
