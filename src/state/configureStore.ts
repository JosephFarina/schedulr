import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import * as createLogger from 'redux-logger'
import rootReducer from './'

import DevTools from '../containers/DevTools'

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
