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
    <div>

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

      {/* TODO: TimeInput here */}

      <Button block={true} >Create</Button>

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
