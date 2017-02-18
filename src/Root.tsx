import * as React from 'react'
import { PropTypes } from 'react'

import Alert from 'src/shared/containers/Alert'
import DevTools from 'src/shared/containers/DevTools'
import ModalRoot from 'src/shared/containers/ModalRoot'
import Navigation from 'src/shared/containers/Navigation'
import { InfoBar } from 'src/shared/components/InfoBar'
import { Container } from 'src/shared'


const Root: React.StatelessComponent<{}> = (props) => (
  <Container>
    <InfoBar {...props} />
    <Navigation />
    {props.children || null}
    <DevTools />
    <ModalRoot />
    <Alert />
  </Container>
)

Root.propTypes = {}

export default Root
