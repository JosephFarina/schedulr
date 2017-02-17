import { Option } from 'react-select'

import {
  RState,
  Shift,
  RShiftEditor,
  ShiftTemplate,
  Client
} from 'src/models'

import { initialState } from './reducer'
import {
  getEmployeeById,
  getClientById,
  getLocationById,
} from 'src/state/entities'

import {
  convertEntityToSelectOptions,
  mergeTimeIntoDate,
  uuid,
  rangeParser,
  timeDuration
} from 'src/utils'

export const getState = (state: RState): RShiftEditor => state.shift.editor
export const getShift = (state: RState): ShiftTemplate => getState(state).newShift
export const getEmployeeIds = (state: RState): string[] => state.shift.editor.employeesInShift
export const getDate = (state: RState): string => state.shift.editor.shiftDate
export const getUnparsedTimeRange = (state: RState): string => state.shift.editor.unparsedTimeRange

export const getGeneratedShifts = (state: RState): Shift[] => {
  const employeesInShift = getEmployeeIds(state)
  const shiftBeingCreated = getShift(state)
  const {unparsedTimeRange, shiftDate} = getState(state)
  const {
    client,
    location
  } = shiftBeingCreated

  // TODO: test and make sure shift is being generated properly from the unparsed time range
  const [startTime, endTime] = rangeParser(shiftDate, unparsedTimeRange)

  const shift: Shift = {
    employee: null,
    startTime: startTime.format(),
    location,
    duration: timeDuration(startTime, endTime),
    client
  }

  if (employeesInShift.length === 0) {
    return [Object.assign({}, shift, {
      id: uuid()
    })]
  }

  return employeesInShift.map(employee => {
    return Object.assign({}, shift, {
      employee,
      id: uuid()
    })
  })
}

export const getEmployeeOptions = (state: RState): Option[] => {
  const employees = getEmployeeIds(state).map(id => getEmployeeById(state, id))
  return convertEntityToSelectOptions(employees)
}

/**
 * Get Client In Shift Being Created 
 */

export const getClientId = (state: RState): string => state.shift.editor.newShift.client

export const getClientOptionInShiftBeingCreated = (state: RState): Option => {
  const clientId = getClientId(state)

  // FIXME: wrapping in an array to convertEntity -- make it so a single value can also be converted into an option
  const client = [getClientById(state, clientId)]
  return clientId ? convertEntityToSelectOptions(client)[0] : null
}

/**
 * Get Location of the current Selected Client
 */

export const getLocationIdsOfClientInShiftBeingCreated = (state: RState): Location[] => {
  const clientId = getClientId(state)
  const client: Client = getClientById(state, clientId)
  return client ? client.locations.map(id => getLocationById(state, id)) : []
}

export const getLocationIdInShiftBeingCreated = (state: RState): string => state.shift.editor.newShift.location

export const getLocationOptionInShiftBeingCreated = (state: RState): Option => {
  const locationId = getLocationIdInShiftBeingCreated(state)

  // FIXME: wrapping in an array to convertEntity -- make it so a single value can also be converted into an option
  const location = [getLocationById(state, locationId)]
  return locationId ? convertEntityToSelectOptions(location)[0] : null
}

// Allows for checking if some shift is equal to the intial state
export const shiftIsEqualToInitialState = (shift: Shift) => {
  const { client, duration, id, location, startTime } = initialState.newShift

  return (
    client === shift.client &&
    duration === shift.duration &&
    id === shift.id &&
    location === shift.location &&
    startTime === shift.startTime
  )
}
