import * as React from 'react'

import {
  MapStateToProps,
  connect,
} from 'react-redux'

import {
  Accordion,
  PaneContent,
  PaneHeader,
  PaneSidebar,
} from 'src/shared/components'

import {
  GeneralInspector,
  RState
} from 'src/models'

import { getInspectorGeneralData } from 'src/state/entities'

const ctx = require('classnames')

interface InspectorProps {
  generalInspector: GeneralInspector
}

interface InspectorState {

}

class Inspector extends React.Component<InspectorProps, InspectorState> {
  public static defaultProps: InspectorProps = {
    generalInspector: {}
  }

  public render() {
    const { generalInspector } = this.props
    const {
      breakdown,
      shifts,
      totalDuration
    } = generalInspector

    const {
      clients,
      employees,
      locations
    } = breakdown

    const className = ctx({

    })

    return (
      <PaneSidebar>
        <PaneHeader>Jan 15, 2017</PaneHeader>
        <PaneContent>
          <div>
            <h1>Shift Overview</h1>

            <h4><strong>{shifts.length}</strong> Shifts</h4>
            <h4><strong>{totalDuration / 60}</strong> Hours</h4>

            <ul>
              <li>
                <Accordion>
                  <h4>{Object.keys(employees).length}: Employees</h4>
                  <ul>
                    {Object.keys(employees).map((id, i) => {
                      const employee = employees[id]
                      return <li key={i}><strong>{employee.totalDuration / 60}: </strong>{employee.entity.alias}</li>
                    })}
                  </ul>
                </Accordion>
              </li>
              <li>
                <Accordion>
                  <h4>{Object.keys(clients).length}: Clients</h4>
                  <ul>
                    {Object.keys(clients).map((id, i) => {
                      const client = clients[id]
                      return <li key={i}><strong>{client.totalDuration / 60}: </strong>{client.entity.alias}</li>
                    })}
                  </ul>
                </Accordion>
              </li>
              <li>
                <Accordion>
                  <h4>{Object.keys(locations).length}: Locations</h4>
                  <ul>
                    {Object.keys(locations).map((id, i) => {
                      const location = locations[id]
                      return <li key={i}><strong>{location.totalDuration / 60}: </strong>{location.entity.alias}</li>
                    })}
                  </ul>
                </Accordion>
              </li>
            </ul>

          </div>

        </PaneContent>
      </PaneSidebar >
    )
  }
}


const mapStateToProps: MapStateToProps<InspectorProps, RState> = (state: RState, ownProps: InspectorProps) => {
  return {
    generalInspector: getInspectorGeneralData(state)
  }
}

export default connect(mapStateToProps)(Inspector)
