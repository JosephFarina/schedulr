import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux'
import * as createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import DevTools from '../containers/DevTools'
import rootReducer from './'

const configureStore = (preloadedState: any = undefined) => {
  const store = createStore(
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

  return store
}

export default configureStore
