import * as React from 'react'

import {
  Accordion,
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
          Overview
          <ul>
            <li>
              <Accordion>
                <h3> 15 Employees Scheduled </h3>
                <ul>
                  <li>one`o</li>
                  <li>tow</li>
                </ul>
              </Accordion>
            </li>
            <li>
              <Accordion>
                <h3> 90 Hours cumalative hours </h3>
                <ul>
                  <li>one`o</li>
                  <li>tow</li>
                </ul>
              </Accordion>
            </li>
            <li>
              <Accordion>
                <h3> 45 Shifts </h3>
                <ul>
                  <li>one`o</li>
                  <li>tow</li>
                </ul>
              </Accordion>
            </li>
            <li>
              <Accordion>
                <h3> 5 Clients </h3>
                <ul>
                  <li>one`o</li>
                  <li>tow</li>
                </ul>
              </Accordion>
            </li>
            <li>
              <Accordion>
                <h3> 9 Locations </h3>
                <ul>
                  <li>one`o</li>
                  <li>tow</li>
                </ul>
              </Accordion>
            </li>
          </ul>

        </PaneContent>
      </PaneSidebar >
    )
  }
}

export default Inspector
