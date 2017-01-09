import * as M from 'moment'

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
  getAllOtherKeys,
  rangeParser,
  timeDuration
} from 'src/utils'

import {
  getClients,
  getEmployees,
  getLocations,
} from 'src/state/entities'

import Button from 'src/components/buttons/Button'
import ButtonGroup from 'src/components/buttons/ButtonGroup'
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
  timeInputValue?: string
  parsedTimeRange?: M.Moment[]
}

export class ShiftEditor extends React.Component<Props, State> {
  public static defaultProps: Props = {
    handleReset: () => { },
    handleSubmit: () => { },
    newShift: {},
    employees: {},
    employeesInShift: [],
    clients: {},
    locations: {}
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      timeInputValue: '',
      parsedTimeRange: undefined
    }

    this.removeEmployee = this.removeEmployee.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleTimeChangeEnd = this.handleTimeChangeEnd.bind(this)
  }


  /**
   * 
   * Actions
   * 
   */


  public addEmployee(id: string | number): void {
    const { dispatch } = this.props
    dispatch(addEmployeeToShift(id as string))
  }

  private removeEmployee(id: string | number): void {
    const { dispatch } = this.props
    dispatch(removeEmployeeFromShift(id as string))
  }

  public updateClient(clientId: string): void {
    const { dispatch, clients } = this.props
    const clientsFirstLocation = clients[clientId].locations[0]
    dispatch(updateNewShift({
      client: clientId,
      location: clientsFirstLocation
    }))
  }

  private updateLocation(location: string): void {
    const { dispatch } = this.props
    dispatch(updateNewShift({ location }))
  }


  /**
   * 
   * Event Handlers
   * 
   */


  private handleTimeChange(timeInputValue: string) {
    this.setState({
      timeInputValue
    })
  }

  private handleTimeChangeEnd() {
    const { dispatch } = this.props
    const { timeInputValue } = this.state
    const parsedTimeRange = rangeParser(M(), timeInputValue)

    // there is no text entered reset parsedTimeRange back to undefined so it isnt being validated 
    if (timeInputValue.length === 0) {
      this.setState({ parsedTimeRange: undefined })
      dispatch(updateNewShift({
        startTime: null,
        duration: null
      }))
    }

    // if there is a parsedTime range get the duration and dispatch the store
    // tslint:disable-next-line:one-line
    else if (parsedTimeRange) {
      const [start, end] = rangeParser(M(), timeInputValue)
      this.setState({ parsedTimeRange })
      dispatch(updateNewShift({
        startTime: start.format(),
        duration: timeDuration(start, end)
      }))

    } else {
      this.setState({ parsedTimeRange: null })
      dispatch(updateNewShift({
        startTime: null,
        duration: null
      }))
    }
  }


  /**
   * 
   * Helpers
   * 
   */


  private getTimeInputMessage(timeRange: M.Moment[]): string {
    if (timeRange) {
      const [start, end] = timeRange
      return `${start.format('h:mmA')}-${end.format('h:mmA')}`
    } else if (timeRange === null) {
      return 'Invalid range'
    } else {
      return ''
    }
  }

  private timeRangeIsValid(): boolean {
    const {  parsedTimeRange } = this.state
    // if its undefined meens it hasnt been touched yet,
    // so pass null so no colors ares displayed otherwise conver parsedTime into a boolean and pass that
    return parsedTimeRange === undefined ? null : !!parsedTimeRange
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
    const { timeInputValue, parsedTimeRange } = this.state
    const display = this.getTimeInputMessage(parsedTimeRange)

    return (
      <div>
        <Input
          label={'Time Range'}
          message={display}
          value={timeInputValue}
          valid={this.timeRangeIsValid()}
          onChange={this.handleTimeChange}
          onChangeEnd={this.handleTimeChangeEnd} />
      </div>
    )
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
