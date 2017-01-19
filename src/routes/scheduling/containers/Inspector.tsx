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
          Overview
            <div>
            90 Total Hours Between 35 Shifts
                <ul>
              <li>
                <Accordion>
                  <div>{employees.length} employees</div>
                  <ul>
                    {employees.map((employee, i) => (
                      <Accordion>
                        <li key={i}>{employee.alias}</li>
                        <ul>
                          <li>
                            <Accordion>
                              <div>Clients</div>
                              <ul>
                                <li>4 Hours client one</li>
                                <li>3 hours client two</li>
                              </ul>
                            </Accordion>
                          </li>
                          <li>
                            <Accordion>
                              <div>Locations</div>
                              <ul>
                                <li>2 Hours location one</li>
                                <li>4 hours location four</li>
                                <li>3 hours location sevon</li>
                              </ul>
                            </Accordion>
                          </li>
                        </ul>
                      </Accordion>
                    ))}
                  </ul>
                </Accordion>
              </li>
              <li>
                <Accordion>
                  <div>{employees.length} employees</div>
                  <ul>
                    {employees.map((employee, i) => (
                      <Accordion>
                        <li key={i}>{employee.alias}</li>
                        <ul>
                          <li>
                            <Accordion>
                              <div>Clients</div>
                              <ul>
                                <li>4 Hours client one</li>
                                <li>3 hours client two</li>
                              </ul>
                            </Accordion>
                          </li>
                          <li>
                            <Accordion>
                              <div>Locations</div>
                              <ul>
                                <li>2 Hours location one</li>
                                <li>4 hours location four</li>
                                <li>3 hours location sevon</li>
                              </ul>
                            </Accordion>
                          </li>
                        </ul>
                      </Accordion>
                    ))}
                  </ul>
                </Accordion>
              </li>
              <li>
                <Accordion>
                  <div>{employees.length} employees</div>
                  <ul>
                    {employees.map((employee, i) => (
                      <Accordion>
                        <li key={i}>{employee.alias}</li>
                        <ul>
                          <li>
                            <Accordion>
                              <div>Clients</div>
                              <ul>
                                <li>4 Hours client one</li>
                                <li>3 hours client two</li>
                              </ul>
                            </Accordion>
                          </li>
                          <li>
                            <Accordion>
                              <div>Locations</div>
                              <ul>
                                <li>2 Hours location one</li>
                                <li>4 hours location four</li>
                                <li>3 hours location sevon</li>
                              </ul>
                            </Accordion>
                          </li>
                        </ul>
                      </Accordion>
                    ))}
                  </ul>
                </Accordion>
              </li>
            </ul>
          </div>

          <Accordion>
            <h3> 45 Shifts </h3>
            <ul>
              <li>one`o</li>
              <li>tow</li>
            </ul>
          </Accordion>
          <Accordion>
            <h3> 5 Clients </h3>
            <ul>
              <li>one`o</li>
              <li>tow</li>
            </ul>
          </Accordion>
          <Accordion>
            <h3> 9 Locations </h3>
            <ul>
              <li>one`o</li>
              <li>tow</li>
            </ul>
          </Accordion>

        </PaneContent>
      </PaneSidebar >
    )
  }
}

export default Inspector
