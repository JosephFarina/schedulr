import * as React from 'react'
import {
  MapStateToProps,
  connect,
} from 'react-redux'

import {
  Clients,
  Employees,
  Locations,
  RState,
  Shift
} from 'src/models'

import {
  addEmployeeToShift,
  getEmployeesInShiftBeingCreated,
  getShiftBeingCreated,
  updateNewShift,
} from 'src/state/shift'

import {
  convertEntityToSelectOptions
} from 'src/utils'

import {
  getClients,
  getEmployees,
  getLocations,
} from 'src/state/entities'

import Button from 'src/components/buttons/Button'
import ButtonGroup from 'src/components/buttons/ButtonGroup'
import AutoComplete from 'src/components/inputs/AutoComplete'
import Input from 'src/components/inputs/Input'
import Select from 'src/components/inputs/Select'

interface Props {
  dispatch?: Function
  newShift?: Shift
  employeesInShift?: string[]

  // Entities
  clients?: Clients
  employees?: Employees
  locations?: Locations

  handleSubmit?(): void
  handleReset?(): void
}

interface State {

}

class ShiftEditor extends React.Component<Props, State> {
  public static defaultProps: Props = {
    handleReset: () => { },
    handleSubmit: () => { },
    newShift: {}
  }

  constructor(props: Props) {
    super(props)
  }

  /**
   * 
   * Actions
   * 
   */

  private addEmployee(val: string | number): void {
    const { dispatch } = this.props
    dispatch(addEmployeeToShift(val as string))
  }


  /**
   * 
   * Renderers
   * 
   */

  private renderEmployeeSelector() {
    const { employees, newShift, employeesInShift } = this.props
    const selectedEmployees = newShift.employees
    const employeeOptions = convertEntityToSelectOptions(employees)

    return (
      <div>
        <Select value={'VAluee'} onChange={val => this.addEmployee(val)} options={employeeOptions} />
        {employeesInShift.map(employee => <div>{employee}</div>)}
      </div>
    )
  }

  private renderNewShiftEditor() {
    const {
      newShift,
      locations
    } = this.props

    const {
      client,
      duration,
      employees,
      id,
      location,
      startTime
    } = newShift

    return (
      <div>
        {this.renderEmployeeSelector()}
      </div>
    )
  }

  public render() {
    return (
      <div>
        {this.renderNewShiftEditor()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToProps<Props, RState> = (state: RState, ownProps: Props) => {
  return {
    newShift: getShiftBeingCreated(state),
    employeesInShift: getEmployeesInShiftBeingCreated(state),
    clients: getClients(state),
    employees: getEmployees(state),
    locations: getLocations(state)
  }
}

export default connect(mapStateToProps)(ShiftEditor)
