import * as React from 'react'
import { PropTypes } from 'react'

import Alert from 'src/shared/containers/Alert'
import DevTools from 'src/shared/containers/DevTools'
import ModalRoot from 'src/shared/containers/ModalRoot'

const Root: React.StatelessComponent<{}> = (props) => (
  <div>
    {props.children || null}
    <DevTools />
    <ModalRoot />
    <Alert />
  </div>
)

Root.propTypes = { }

export default Root
