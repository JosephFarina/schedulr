import * as M from 'moment'

const uniqueId = require('lodash.uniqueid')

import {
  RState,
  Shift,
  ShiftTemplate,
} from 'src/models'

import {
  initialState
} from './reducer'


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

export const getSelectedShiftId = (state: RState): string => state.shift.editor.selectedShift
export const getShiftBeingEdited = (state: RState): ShiftTemplate => Object.assign({}, state.shift.editor.editedShift)
export const getShiftBeingCreated = (state: RState): ShiftTemplate => Object.assign({}, state.shift.editor.newShift)
export const getEmployeesInShiftBeingCreated = (state: RState): string[] => state.shift.editor.employeesInShift
export const getShiftDate = (state: RState): string => state.shift.editor.shiftDate
export const getDatePickerMonth = (state: RState): string => state.shift.editor.datePickerMonth

export const getGeneratedShifts = (state: RState): Shift[] => {
  const employeesInShift = getEmployeesInShiftBeingCreated(state)
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
      id: generateUUID()
    })]
  }

  return employeesInShift.map(employee => {
    return Object.assign({}, shift, {
      employee,
      id: generateUUID()
    })
  })
}


function mergeTimeIntoDate(_date: string, _time: string): string {
  const date = M(_date)
  const time = M(_time)
  return date.hour(time.hour()).minute(time.minute()).second(0).format()
}

function generateUUID() {
  return uniqueId(`client_generated_${Math.floor(Math.random() * 10000)}_`)
}