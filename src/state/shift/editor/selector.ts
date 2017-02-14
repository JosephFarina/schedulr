import { Option } from 'react-select'

import {
  RState,
  Shift,
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
  uuid
} from 'src/utils'

export const getShiftBeingCreated = (state: RState): ShiftTemplate => state.shift.editor.newShift
export const getEmployeeIdsInShiftBeingCreated = (state: RState): string[] => state.shift.editor.employeesInShift
export const getShiftDate = (state: RState): string => state.shift.editor.shiftDate

export const getGeneratedShifts = (state: RState): Shift[] => {
  const employeesInShift = getEmployeeIdsInShiftBeingCreated(state)
  const shiftBeingCreated = getShiftBeingCreated(state)
  const {
    client,
    location,
    duration,
    startTime
  } = shiftBeingCreated

  const shift: Shift = {
    employee: null,
    startTime: mergeTimeIntoDate(getShiftDate(state), startTime),
    location,
    duration,
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

export const getEmployeeOptionsInShiftBeingCreated = (state: RState): Option[] => {
  const employees = getEmployeeIdsInShiftBeingCreated(state).map(id => getEmployeeById(state, id))
  return convertEntityToSelectOptions(employees)
}

/**
 * Get Client In Shift Being Created 
 */

export const getClientIdInShiftBeingCreated = (state: RState): string => state.shift.editor.newShift.client

export const getClientOptionInShiftBeingCreated = (state: RState): Option => {
  const clientId = getClientIdInShiftBeingCreated(state)

  // FIXME: wrapping in an array to convertEntity -- make it so a single value can also be converted into an option
  const client = [getClientById(state, clientId)]
  return clientId ? convertEntityToSelectOptions(client)[0] : null
}

/**
 * Get Location of the current Selected Client
 */

export const getLocationIdsOfClientInShiftBeingCreated = (state: RState): Location[] => {
  const clientId = getClientIdInShiftBeingCreated(state)
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
