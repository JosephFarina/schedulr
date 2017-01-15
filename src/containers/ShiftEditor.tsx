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
  ShiftTemplate
} from 'src/models'

import {
  addEmployeeToShift,
  currentDatePickerMonth,
  generateShifts,
  getDatePickerMonth,
  getEmployeesInShiftBeingCreated,
  getShiftBeingCreated,
  getShiftDate,
  nextDatePickerMonth,
  previousDatePickerMonth,
  removeEmployeeFromShift,
  shiftIsEqualToInitialState,
  updateNewShift,
  updateShiftDate,
} from 'src/state/shift'

import {
  cloneOrCreateMo,
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

import {
  Button,
  ButtonGroup
} from 'src/components'

import Calendar from 'src/components/calendar/Calendar'
import Chips from 'src/components/inputs/Chips'
import Input from 'src/components/inputs/Input'
import Select from 'src/components/inputs/Select'

interface Props {
  dispatch?: Function
  newShift?: ShiftTemplate
  employeesInShift?: string[]
  shiftDate?: string
  datePickerMonth?: string

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
    datePickerMonth: '',
    shiftDate: '',
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
    this.handleDateSelect = this.handleDateSelect.bind(this)
    this.handleDatePickerNextRange = this.handleDatePickerNextRange.bind(this)
    this.handleDatePickerPreviousRange = this.handleDatePickerPreviousRange.bind(this)
    this.handleDatePickerCurrentRange = this.handleDatePickerCurrentRange.bind(this)
    this.generateShifts = this.generateShifts.bind(this)
  }

  public componentWillReceiveProps(nextProps: Props) {
    // this is use to clear the current input time after a shift is updated since it isnt connected to redux
    const { newShift } = nextProps
    if (shiftIsEqualToInitialState(newShift)) {
      this.setState({
        timeInputValue: '',
        parsedTimeRange: undefined
      })
    }
  }

  /**
   * 
   * Actions
   * 
   */

  private generateShifts(): void {
    const { dispatch } = this.props
    dispatch(generateShifts())
  }

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

  public handleTimeChangeEnd() {
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

  private handleDateSelect(date: M.Moment) {
    const { dispatch } = this.props
    dispatch(updateShiftDate(date))
  }

  private handleDatePickerNextRange() {
    const { dispatch, datePickerMonth } = this.props
    dispatch(nextDatePickerMonth(datePickerMonth))
  }

  private handleDatePickerPreviousRange() {
    const { dispatch, datePickerMonth } = this.props
    dispatch(previousDatePickerMonth(datePickerMonth))
  }

  private handleDatePickerCurrentRange() {
    const { dispatch } = this.props
    dispatch(currentDatePickerMonth())
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

  private renderDateSelector() {
    const { shiftDate, datePickerMonth } = this.props
    const date = cloneOrCreateMo(shiftDate)
    const month = cloneOrCreateMo(datePickerMonth)

    return <Calendar
      onCurrRangeClick={this.handleDatePickerCurrentRange}
      onNextRangeClick={this.handleDatePickerNextRange}
      onPrevRangeClick={this.handleDatePickerPreviousRange}
      firstDaySelectable={M()}
      month={month}
      selectedDay={date}
      onDayClick={this.handleDateSelect}
      isDatePicker={true} />
  }

  public render() {
    return (
      <div style={{ height: '100%' }}>
        <div style={{
          height: 'calc(100% - 3rem)',
          overflow: 'scroll'
        }}>
          {this.renderEmployeeSelector()}
          {this.renderClientSelector()}
          {this.renderLocationSelector()}
          {this.renderTimeSelector()}
          {this.renderDateSelector()}
        </div>
        <div style={{ marginTop: '.8rem' }}>
          <Button onClick={this.generateShifts} block={true} >Create</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToProps<Props, RState> = (state: RState, ownProps: Props) => {
  return {
    newShift: getShiftBeingCreated(state),
    employeesInShift: getEmployeesInShiftBeingCreated(state),
    shiftDate: getShiftDate(state),
    datePickerMonth: getDatePickerMonth(state),
    clients: getClients(state),
    employees: getEmployees(state),
    locations: getLocations(state)
  }
}

export default connect(mapStateToProps)(ShiftEditor)
