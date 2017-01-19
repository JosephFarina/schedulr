import * as React from 'react'

import {
  Accordion,
  PaneContent,
  PaneHeader,
  PaneSidebar,
} from 'src/shared/components'

import {
  GeneralInspector
} from 'src/models'

import {
  clientsOneArray,
  employeesOneArray,
  locationsOneArray
} from 'src/testUtils'

const ctx = require('classnames')

interface InspectorProps extends GeneralInspector {

}

interface InspectorState {

}

class Inspector extends React.Component<InspectorProps, InspectorState> {
  public static defaultProps: InspectorProps = {
    clients: clientsOneArray,
    employees: employeesOneArray,
    locations: locationsOneArray
  }

  public render() {
    const {
      clients,
      employees,
      locations
    } = this.props

    const className = ctx({

    })

    return (
      <PaneSidebar>
        <PaneHeader>Jan 15, 2017</PaneHeader>
        <PaneContent>
          <div>
            <h1>Shift Overview</h1>

            <Accordion>
              <h2><strong>90</strong> Hours</h2>
              <ul>
                <li>
                  <Accordion>
                    <h4>Employees</h4>
                    <ul>
                      <li><strong>15:</strong> Employee One</li>
                      <li><strong>20:</strong> Employee Two</li>
                      <li><strong>30.5:</strong> Employee Three</li>
                    </ul>
                  </Accordion>
                </li>
                <li>
                  <Accordion>
                    <h4>Clients</h4>
                    <ul>
                      <li><strong>15:</strong> Client One</li>
                      <li><strong>20:</strong> Client Two</li>
                      <li><strong>30.5:</strong> Client Three</li>
                    </ul>
                  </Accordion>
                </li>
                <li>
                  <Accordion>
                    <h4>Locations</h4>
                    <ul>
                      <li><strong>15:</strong> Location One</li>
                      <li><strong>20:</strong> Location Two</li>
                      <li><strong>30.5:</strong> Location Three</li>
                    </ul>
                  </Accordion>
                </li>
              </ul>
            </Accordion>

            <Accordion>
              <h2><strong>35</strong> Shifts</h2>
              <ul>
                <li>
                  <Accordion>
                    <h4>Employees</h4>
                    <ul>
                      <li><strong>4:</strong> Employee One</li>
                      <li><strong>8:</strong> Employee Two</li>
                      <li><strong>2:</strong> Employee Three</li>
                    </ul>
                  </Accordion>
                </li>
                <li>
                  <Accordion>
                    <h4>Clients</h4>
                    <ul>
                      <li><strong>4:</strong> Client One</li>
                      <li><strong>1:</strong> Client Two</li>
                      <li><strong>30:</strong> Client Three</li>
                    </ul>
                  </Accordion>
                </li>
                <li>
                  <Accordion>
                    <h4>Locations</h4>
                    <ul>
                      <li><strong>15:</strong> Location One</li>
                      <li><strong>20:</strong> Location Two</li>
                      <li><strong>10:</strong> Location Three</li>
                    </ul>
                  </Accordion>
                </li>
              </ul>
            </Accordion>

            <h2><strong>5</strong> Clients</h2>

            <h2><strong>4</strong> Employees</h2>

            <h2><strong>3</strong> Locations</h2>


          </div>

        </PaneContent>
      </PaneSidebar >
    )
  }
}

export default Inspector
