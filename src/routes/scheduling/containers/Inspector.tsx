import * as React from 'react'

import {
  Button,
  ButtonGroup,
  PaneContent,
  PaneHeader,
  PaneSidebar,
} from 'src/shared/components'

const ctx = require('classnames')

interface InspectorProps {

}

interface InspectorState {

}

class Inspector extends React.Component<InspectorProps, InspectorState> {
  public static defaultProps: InspectorProps = {

  }

  public render() {
    const {

    } = this.props

    const className = ctx({

    })

    return (
      <PaneSidebar>
        <PaneHeader>Jan 15, 2017</PaneHeader>
        <PaneContent>
          InspectorState
        </PaneContent>
      </PaneSidebar>
    )
  }
}

export default Inspector
