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
  removeEmployeeFromShift,
  updateNewShift,
} from 'src/state/shift'

import {
  convertEntityToSelectOptions,
  getAllOtherKeys
} from 'src/utils'

import {
  getClients,
  getEmployees,
  getLocations,
} from 'src/state/entities'

import Button from 'src/components/buttons/Button'
import ButtonGroup from 'src/components/buttons/ButtonGroup'
import AutoComplete from 'src/components/inputs/AutoComplete'
import Chips from 'src/components/inputs/Chips'
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

    this.removeEmployee = this.removeEmployee.bind(this)
  }


  /**
   * 
   * Actions
   * 
   */


  private addEmployee(id: string | number): void {
    const { dispatch } = this.props
    dispatch(addEmployeeToShift(id as string))
  }

  private removeEmployee(id: string | number): void {
    const { dispatch } = this.props
    dispatch(removeEmployeeFromShift(id as string))
  }

  private updateClient(client: string): void {
    const { dispatch, clients } = this.props
    const clientsFirstLocation = clients[client].locations[0]
    dispatch(updateNewShift({
      client,
      location: clientsFirstLocation
    }))
  }

  private updateLocation(location: string): void {
    const { dispatch } = this.props
    dispatch(updateNewShift({ location }))
  }


  /**
   * 
   * Renderers
   * 
   */


  private renderEmployeeSelector() {
    const { employees, employeesInShift } = this.props
    const employeeOptions = convertEntityToSelectOptions(employees, employeesInShift)
    const selectedEmployeeChips = convertEntityToSelectOptions(employeesInShift.map(employeeId => employees[employeeId]))

    return (
      <div>
        <Select value={'Employee'} onChange={val => this.addEmployee(val)} options={employeeOptions} />
        <Chips removeChip={this.removeEmployee} options={selectedEmployeeChips} />
      </div>
    )
  }

  private renderClientSelector() {
    const { clients, newShift } = this.props
    const selectedClient = newShift.client
    const clientOptions = convertEntityToSelectOptions(clients, [selectedClient])
    const displayValue = selectedClient ? clients[selectedClient].alias : 'Client'

    return (
      <div>
        <Select value={displayValue} onChange={val => this.updateClient(val as string)} options={clientOptions} />
      </div>
    )
  }

  private renderLocationSelector() {
    const { clients, locations, newShift } = this.props
    const selectedLocation = newShift.location
    const selectedClient = clients[newShift.client] || null
    const displayValue = selectedLocation ? locations[selectedLocation].alias : 'Location'

    const keysToFilterOut = selectedClient ? getAllOtherKeys(locations, selectedClient.locations).concat(selectedLocation) : []
    const locationOptions = selectedClient ? convertEntityToSelectOptions(locations, keysToFilterOut) : []

    return (
      <div>
        <Select value={displayValue} onChange={val => this.updateLocation(val as string)} options={locationOptions} />
      </div>
    )
  }

  private renderTimeSelector() {
    return <div></div>
  }

  public render() {
    return (
      <div>
        {this.renderEmployeeSelector()}
        {this.renderClientSelector()}
        {this.renderLocationSelector()}
        {this.renderTimeSelector()}
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
