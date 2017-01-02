import { createSelector } from 'reselect'

import {
  MorString,
  cloneOrCreateMo,
} from './../../utils/momentHelpers.util'

import * as I from './../../models'

export function getRawShifts(state: I.RState): I.Shifts {
  return state.shifts.shifts
}

export function getEditedShifts(state: I.RState): I.Shifts {
  return state.shifts.editedShifts
}

export function getAddedShifts(state: I.RState): I.Shifts {
  return state.shifts.addedShifts
}

export function getDeletedShifts(state: I.RState): string[] {
  return state.shifts.deletedShifts
}

export const getShifts = createSelector(
  getRawShifts,
  getEditedShifts,
  getAddedShifts,
  getDeletedShifts,
  (raw, edited, added, deleted) => filter
)

function filter(rawShifts: I.Shifts, editedShifts: I.Shifts, addedShifts: I.Shifts, deletedShifts: string[]): I.Shifts {
  let updateShifts: any = Object.assign({}, rawShifts, addedShifts, editedShifts)

  // convert shifts to an array and then filter out the deleted shifts
  updateShifts = Object.keys(updateShifts).map(shiftId => updateShifts[shiftId]).filter((shift: I.Shift) => {
    return deletedShifts.indexOf(shift.id) < 0
  })

  return updateShifts
}

// Takes in a date and shifts object 
export function getShiftsByDay(inputDate: MorString, shifts: I.Shift[]): I.Shift[] {
  const date = cloneOrCreateMo(inputDate)

  if (shifts) {
    const filtedShiftIds: string[] = Object.keys(shifts).filter((shiftId) => {
      const shift = shifts[shiftId]
      return date.isSame(shift.startTime, 'day')
    })
    return Object.keys(filtedShiftIds).map(id => shifts[id])
  }
}

