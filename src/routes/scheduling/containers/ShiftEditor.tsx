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

import * as Shift from 'src/state/shift'

import {
  Select,
  DatePicker,
  Button,
  UncontrolledInput,
  TimeInput
} from 'src/shared/ui'

interface Props {
  dispatch?: Function
  newShift?: ShiftTemplate
  shiftDate?: string
  unparsedTimeRange?: string
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
  timeRangeChange?: (e: any) => void

  handleSubmit?(): void
  handleReset?(): void
}

const ShiftEditor: React.StatelessComponent<any> = (props: Props) => {
  const {
    shiftDate,
    validatorObj,
    unparsedTimeRange,

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
    handleSubmit,
    timeRangeChange
  } = props

  return (
    <form onSubmit={e => e.preventDefault()} style={{padding: '10px'}} >

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

      <UncontrolledInput
        name="startTime"
        label="Time Range"
        date={M(shiftDate)}
        validateObj={validatorObj}
        value={unparsedTimeRange}
        onChange={timeRangeChange}
      />

      <Button type="primary" onClick={handleSubmit} block={true} >Create</Button>

    </form>
  )
}

const mapStateToProps: MapStateToProps<Props, RState> = (state: RState, ownProps: Props) => {
  return {
    employees: getEmployees(state),
    selectedEmployees: Shift.Editor.Selectors.getEmployeeOptions(state),
    clients: getClients(state),
    selectedClient: Shift.Editor.Selectors.getClientOptionInShiftBeingCreated(state),
    locations: Shift.Editor.Selectors.getLocationIdsOfClientInShiftBeingCreated(state),
    selectedLocation: Shift.Editor.Selectors.getLocationOptionInShiftBeingCreated(state),
    shiftDate: Shift.Editor.Selectors.getDate(state),
    validatorObj: Shift.Editor.Validators.newShiftValidator(state),
    unparsedTimeRange: Shift.Editor.Selectors.getUnparsedTimeRange(state)
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    employeeChange(options: Option[]) {
      dispatch(Shift.Editor.Actions.setEmployee(options))
    },
    clientChange(option: Option) {
      dispatch(Shift.Editor.Actions.setClient(option))
    },
    locationChange(option: Option) {
      dispatch(Shift.Editor.Actions.setLocation(option))
    },
    dateChange(m: M.Moment) {
      dispatch(Shift.Editor.Actions.setDate(m))
    },
    timeChange(m: M.Moment[]) {
      dispatch(Shift.Editor.Actions.setTime(m))
    },
    timeRangeChange({target}) {
      dispatch(Shift.Editor.Actions.setUnparsedTimeRange(target.value))
    },
    handleSubmit() {
      dispatch(Shift.Editor.Actions.generate())
    }
  }
}

export default connect(mapStateToProps, MapDispatchToProps)(ShiftEditor)
