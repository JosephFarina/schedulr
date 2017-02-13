import * as React from 'react'
import * as M from 'moment'

import {
  MapStateToProps,
  connect,
} from 'react-redux'

import { Option } from 'react-select'

import {
  Client,
  Employee,
  Location,
  RState,
  ShiftTemplate
} from 'src/models'

import {
  getEmployees,
  getClients
} from 'src/state/entities'

import {
  setEmployeesInShift,
  setClientInShift,
  setLocationInShift,
  getEmployeeOptionsInShiftBeingCreated,
  getClientOptionInShiftBeingCreated,
  getLocationIdsOfClientInShiftBeingCreated,
  getLocationOptionInShiftBeingCreated,
  getShiftDate,
  setShiftDate
} from 'src/state/shift'

import {
  Select,
  DatePicker,
  Button
} from 'src/shared/components'

interface Props {
  dispatch?: Function
  newShift?: ShiftTemplate
  shiftDate?: string

  // Entities
  clients?: Client[]
  employees?: Employee[]
  locations?: Location[]

  // Selected Entities
  selectedEmployees?: Employee[]
  selectedClient?: Client
  selectedLocation?: Location

  // mapped dispatch functiosn
  employeeChange?: (options: Option[]) => void
  clientChange?: (option: Option) => void
  locationChange?: (option: Option) => void
  dateChange?: (moment: M.Moment) => void

  handleSubmit?(): void
  handleReset?(): void
}

const ShiftEditor: React.StatelessComponent<any> = (props: Props) => {
  const {
    shiftDate,

    // entities
    clients,
    employees,
    locations,

    // entity selectors
    selectedClient,
    selectedEmployees,
    selectedLocation,

    // dispatch mapped functions
    employeeChange,
    clientChange,
    locationChange,
    dateChange
  } = props

  return (
    <div style={{ height: '100%' }}>
      <div style={{ height: 'calc(100% - 3rem)' }}>

        <Select
          placeholder="Employees"
          multi
          entities={employees}
          value={selectedEmployees}
          onChange={employeeChange}
        />

        <Select
          placeholder="Clients"
          value={selectedClient}
          entities={clients}
          onChange={clientChange}
        />

        <Select
          placeholder="Location"
          value={selectedLocation}
          entities={locations}
          onChange={locationChange}
        />

        <DatePicker
          id="id"
          date={M(shiftDate)}
          onDateChange={dateChange}
        />

        <Button block={true} >Create</Button>

        {/*{this.renderTimeSelector() */}

      </div>

    </div>
  )
}

const mapStateToProps: MapStateToProps<Props, RState> = (state: RState, ownProps: Props) => {
  return {
    employees: getEmployees(state),
    selectedEmployees: getEmployeeOptionsInShiftBeingCreated(state),
    clients: getClients(state),
    selectedClient: getClientOptionInShiftBeingCreated(state),
    locations: getLocationIdsOfClientInShiftBeingCreated(state),
    selectedLocation: getLocationOptionInShiftBeingCreated(state),
    shiftDate: getShiftDate(state)
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    employeeChange(options: Option[]) {
      dispatch(setEmployeesInShift(options))
    },
    clientChange(option: Option) {
      dispatch(setClientInShift(option))
    },
    locationChange(option: Option) {
      dispatch(setLocationInShift(option))
    },
    dateChange(m: M.Moment) {
      dispatch(setShiftDate(m))
    }
  }
}

export default connect(mapStateToProps, MapDispatchToProps)(ShiftEditor)





























// import * as M from 'moment'
// import { Option } from 'react-select'
// import * as React from 'react'

// import {
//   MapStateToProps,
//   connect,
// } from 'react-redux'


// import {
//   getClientOptionInShiftBeingCreated,
//   getEmployeeOptionsInShiftBeingCreated,

//   addEmployeeToShift,
//   currentDatePickerMonth,
//   setEmployeesInShift,
//   generateShifts,
//   getDatePickerMonth,
//   getShiftBeingCreated,
//   getShiftDate,
//   nextDatePickerMonth,
//   previousDatePickerMonth,
//   removeEmployeeFromShift,
//   shiftIsEqualToInitialState,
//   updateNewShift,
//   updateShiftDate,
// } from 'src/state/shift'

// import {
//   cloneOrCreateMo,
//   convertEntityToSelectOptions,
//   getAllOtherKeys,
//   rangeParser,
//   timeDuration
// } from 'src/utils'

// import {
//   getClients,
//   getEmployees,
//   getLocations,
// } from 'src/state/entities'

// import {
//   Button,
//   ButtonGroup
// } from 'src/shared/components'

// import Calendar from 'src/shared/components/calendar/Calendar'
// import Input from 'src/shared/components/inputs/Input'
// import Select from 'src/shared/components/inputs/Select'

// interface Props {
//   dispatch?: Function
//   newShift?: ShiftTemplate
//   employeesInShift?: string[]
//   shiftDate?: string
//   datePickerMonth?: string

//   // Entities
//   clients?: Client[]
//   employees?: Employee[]
//   locations?: Location[]

//   // Selected Entities
//   selectedEmployees?: Employee[]
//   selectedClient?: Client
//   selectedLocations?: Location[]




//   handleSubmit?(): void
//   handleReset?(): void
// }

// interface State {
//   timeInputValue?: string
//   parsedTimeRange?: M.Moment[]
// }

// export class ShiftEditor extends React.Component<Props, State> {
//   public static defaultProps: Props = {
//     handleReset: () => { },
//     handleSubmit: () => { },
//     newShift: {},
//     employeesInShift: [],
//     datePickerMonth: '',
//     shiftDate: '',

//     employees: [],
//     clients: [],
//     locations: [],
//     selectedClient: null,
//     selectedEmployees: [],
//     selectedLocations: [],
//   }

// constructor(props: Props) {
//   super(props)

//   this.state = {
//     timeInputValue: '',
//     parsedTimeRange: undefined
//   }

//   // new 
//   this.setEmployees = this.setEmployees.bind(this)

//   // old
//   this.handleTimeChange = this.handleTimeChange.bind(this)
//   this.handleTimeChangeEnd = this.handleTimeChangeEnd.bind(this)
//   this.handleDateSelect = this.handleDateSelect.bind(this)
//   this.handleDatePickerNextRange = this.handleDatePickerNextRange.bind(this)
//   this.handleDatePickerPreviousRange = this.handleDatePickerPreviousRange.bind(this)
//   this.handleDatePickerCurrentRange = this.handleDatePickerCurrentRange.bind(this)
//   this.generateShifts = this.generateShifts.bind(this)
// }

// public componentWillReceiveProps(nextProps: Props) {
//   // this is use to clear the current input time after a shift is updated since it isnt connected to redux
//   const { newShift } = nextProps
//   if (shiftIsEqualToInitialState(newShift)) {
//     this.setState({
//       timeInputValue: '',
//       parsedTimeRange: undefined
//     })
//   }
// }

/**
 * 
 * Actions
 * 
 */

// private generateShifts(): void {
//   const { dispatch } = this.props
//   dispatch(generateShifts())
// }

// setEmployees(options: Option[]): void {
//   const {dispatch} = this.props
//   dispatch(setEmployeesInShift(options))
// }





// public updateClient(clientId: string): void {
//   const { dispatch, clients } = this.props
//   const clientsFirstLocation = clients.filter(client => client.id === clientId)[0].locations[0]

//   dispatch(updateNewShift({
//     client: clientId,
//     location: clientsFirstLocation
//   }))
// }

// private updateLocation(location: string): void {
//   const { dispatch } = this.props
//   dispatch(updateNewShift({ location }))
// }


/**
 * 
 * Event Handlers
 * 
 */


// private handleTimeChange(timeInputValue: string) {
//   this.setState({
//     timeInputValue
//   })
// }

// public handleTimeChangeEnd() {
//   const { dispatch } = this.props
//   const { timeInputValue } = this.state
//   const parsedTimeRange = rangeParser(M(), timeInputValue)

//   // there is no text entered reset parsedTimeRange back to undefined so it isnt being validated 
//   if (timeInputValue.length === 0) {
//     this.setState({ parsedTimeRange: undefined })
//     dispatch(updateNewShift({
//       startTime: null,
//       duration: null
//     }))
//   }

//   // if there is a parsedTime range get the duration and dispatch the store
//   // tslint:disable-next-line:one-line
//   else if (parsedTimeRange) {
//     const [start, end] = rangeParser(M(), timeInputValue)
//     this.setState({ parsedTimeRange })
//     dispatch(updateNewShift({
//       startTime: start.format(),
//       duration: timeDuration(start, end)
//     }))

//   } else {
//     this.setState({ parsedTimeRange: null })
//     dispatch(updateNewShift({
//       startTime: null,
//       duration: null
//     }))
//   }
// }

// private handleDateSelect(date: M.Moment) {
//   const { dispatch } = this.props
//   dispatch(updateShiftDate(date))
// }

// private handleDatePickerNextRange() {
//   const { dispatch, datePickerMonth } = this.props
//   dispatch(nextDatePickerMonth(datePickerMonth))
// }

// private handleDatePickerPreviousRange() {
//   const { dispatch, datePickerMonth } = this.props
//   dispatch(previousDatePickerMonth(datePickerMonth))
// }

// private handleDatePickerCurrentRange() {
//   const { dispatch } = this.props
//   dispatch(currentDatePickerMonth())
// }

/**
 * 
 * Helpers
 * 
 */


// private getTimeInputMessage(timeRange: M.Moment[]): string {
//   if (timeRange) {
//     const [start, end] = timeRange
//     return `${start.format('h:mmA')}-${end.format('h:mmA')}`
//   } else if (timeRange === null) {
//     return 'Invalid range'
//   } else {
//     return ''
//   }
// }

// private timeRangeIsValid(): boolean {
//   const {  parsedTimeRange } = this.state
//   // if its undefined meens it hasnt been touched yet,
//   // so pass null so no colors ares displayed otherwise conver parsedTime into a boolean and pass that
//   return parsedTimeRange === undefined ? null : !!parsedTimeRange
// }


/**
 * 
 * Renderers
 * 
 */

// private renderClientSelector() {
//   const { clients, newShift } = this.props
//   const selectedClient = newShift.client
//   // const clientOptions = convertEntityToSelectOptions(clients, [selectedClient])
//   const displayValue = selectedClient ? clients[selectedClient].alias : 'Client'

//   // return (
//   //   // <div>
//   //     {/*<Select value={displayValue} onChange={val => this.updateClient(val as string)} options={clientOptions} />*/}

//   //   {/*</div>*/}
//   // )
// }

// private renderLocationSelector() {
//   const { clients, locations, newShift } = this.props
//   const selectedLocation = newShift.location
//   const selectedClient = clients[newShift.client] || null
//   const displayValue = selectedLocation ? locations[selectedLocation].alias : 'Location'
//   const keysToFilterOut = selectedClient ? getAllOtherKeys(locations, selectedClient.locations).concat(selectedLocation) : []
//   // const locationOptions = selectedClient ? convertEntityToSelectOptions(locations, keysToFilterOut) : []

//   // return (
//   //   // <div>
//   //     {/*<Select value={displayValue} onChange={val => this.updateLocation(val as string)} options={locations} />*/}
//   //   {/*</div>*/}
//   // )
// }

// private renderTimeSelector() {
//   const { timeInputValue, parsedTimeRange } = this.state
//   const display = this.getTimeInputMessage(parsedTimeRange)

//   /*return (
//     <div>
//       <Input
//         label={'Time Range'}
//         message={display}
//         value={timeInputValue}
//         valid={this.timeRangeIsValid()}
//         onChange={this.handleTimeChange}
//         onChangeEnd={this.handleTimeChangeEnd} />
//     </div>
//   )*/
// }

// private renderDateSelector() {
//   const { shiftDate, datePickerMonth } = this.props
//   const date = cloneOrCreateMo(shiftDate)
//   const month = cloneOrCreateMo(datePickerMonth)

{/*return <Calendar
      onCurrRangeClick={this.handleDatePickerCurrentRange}
      onNextRangeClick={this.handleDatePickerNextRange}
      onPrevRangeClick={this.handleDatePickerPreviousRange}
      firstDaySelectable={M()}
      month={month}
      selectedDay={date}
      onDayClick={this.handleDateSelect}
      isDatePicker={true} />*/}
// }

// public render() {
// const {
//   employees,
//   selectedEmployees,
//   clients,
//   selectedClient,
//   locations,
// } = this.props

/*return (
  <div style={{ height: '100%' }}>
    <div style={{ height: 'calc(100% - 3rem)', overflow: 'scroll' }}>

      <Select
        placeholder="Employees"
        multi
        entities={employees}
        value={selectedEmployees}
        onChange={this.setEmployees}
      />

      <Select
        placeholder="Clients"
        value={selectedClient}
        entities={clients}
      />

      <Select entities={locations} />

      {this.renderTimeSelector()}
      {this.renderDateSelector()}
    </div>

    <div style={{ marginTop: '.8rem' }}>
      <Button onClick={this.generateShifts} block={true} >Create</Button>
    </div>
  </div>
)*/
// }
// }

// const mapStateToProps: MapStateToProps<Props, RState> = (state: RState, ownProps: Props) => {
//   return {
// newShift: getShiftBeingCreated(state),
// // employeesInShift: getEmployeesInShiftBeingCreated(state),
// shiftDate: getShiftDate(state),
// datePickerMonth: getDatePickerMonth(state),

// employees: getEmployees(state),
// selectedEmployees: getEmployeeOptionsInShiftBeingCreated(state),

// clients: getClients(state),
// selectedClient: getClientOptionInShiftBeingCreated(state),

// locations: getLocations(state)
//   }
// }
