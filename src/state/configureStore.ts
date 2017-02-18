import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux'
import * as createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import DevTools from '../shared/containers/DevTools'
import rootReducer from './'

const configureStore = (preloadedState: any = undefined) => createStore(
  rootReducer,
  preloadedState,
  compose(
    applyMiddleware(
      thunk,
      createLogger()
    ),
    DevTools.instrument()
  )
)

export default configureStore
