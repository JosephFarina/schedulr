import * as React from 'react'
import { PropTypes } from 'react'
import { Provider } from 'react-redux'

import App from './App'
import DevTools from './DevTools'

const Root: React.StatelessComponent<{store: any}> = ({ store }: any) => (
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
