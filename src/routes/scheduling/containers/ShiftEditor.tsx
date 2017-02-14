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
  ShiftTemplate,
  ValidatorResponseObject
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
  setShiftDate,
  newShiftValidator,
  setShiftTime,
  generateShifts
} from 'src/state/shift'

import {
  Select,
  DatePicker,
  Button,
  TimeInput
} from 'src/shared/components'

interface Props {
  dispatch?: Function
  newShift?: ShiftTemplate
  shiftDate?: string
  validatorObj?: ValidatorResponseObject<any>

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
  timeChange?: (moments: M.Moment[]) => void

  handleSubmit?(): void
  handleReset?(): void
}

const ShiftEditor: React.StatelessComponent<any> = (props: Props) => {
  const {
    shiftDate,
    validatorObj,

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
    dateChange,
    timeChange,
    handleSubmit
  } = props

  return (
    <form onSubmit={e => e.preventDefault()}>

      <Select
        name="employee"
        placeholder="Employees"
        multi
        validateObj={validatorObj}
        entities={employees}
        value={selectedEmployees}
        onChange={employeeChange}
      />

      <Select
        name="client"
        validateObj={validatorObj}
        placeholder="Clients"
        value={selectedClient}
        entities={clients}
        onChange={clientChange}
      />

      <Select
        name="location"
        validateObj={validatorObj}
        placeholder="Location"
        value={selectedLocation}
        entities={locations}
        onChange={locationChange}
      />

      <DatePicker
        name="date"
        validateObj={validatorObj}
        id="id"
        date={M(shiftDate)}
        onDateChange={dateChange}
      />

      <TimeInput
        name="startTime"
        label="Time Range"
        date={M(shiftDate)}
        validateObj={validatorObj}
        onChangeEnd={timeChange}
      />

      <Button onClick={handleSubmit} block={true} >Create</Button>

    </form>
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
    shiftDate: getShiftDate(state),
    validatorObj: newShiftValidator(state)
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
    },
    timeChange(m: M.Moment[]) {
      dispatch(setShiftTime(m))
    },
    handleSubmit() {
      dispatch(generateShifts())
    }
  }
}

export default connect(mapStateToProps, MapDispatchToProps)(ShiftEditor)
