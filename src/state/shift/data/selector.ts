import { createSelector } from 'reselect'

import {
  MorString,
  cloneOrCreateMo,
} from 'src/utils/momentHelpers.util'

import * as I from 'src/models'

export const getRawShifts = (state: I.RState): I.Shifts => Object.assign({}, state.shift.data.shifts)
export const getEditedShifts = (state: I.RState): I.Shifts => Object.assign({}, state.shift.data.editedShifts)
export const getAddedShifts = (state: I.RState): I.Shifts => Object.assign({}, state.shift.data.addedShifts)
export const getDeletedShifts = (state: I.RState): string[] => Object.assign([], state.shift.data.deletedShifts)

/**
 * 
 * Get all shifts -- it gives updated version
 * 
 */

export const getShifts = createSelector(
  getRawShifts,
  getEditedShifts,
  getAddedShifts,
  getDeletedShifts,
  (raw, edited, added, deleted) => {
    return updateShifts(raw, edited, added, deleted)
  }
)

function updateShifts(rawShifts: I.Shifts, editedShifts: I.Shifts, addedShifts: I.Shifts, deletedShifts: string[]): I.Shifts {
  let updateShifts: any = Object.assign({}, rawShifts, addedShifts, editedShifts)

  // convert shifts to an array and then filter out the deleted shifts
  updateShifts = Object.keys(updateShifts).map(shiftId => updateShifts[shiftId]).filter((shift: I.Shift) => {
    return deletedShifts.indexOf(shift.id) < 0
  })

  return updateShifts
}

/**
 * 
 * Get all the shifts of a single day
 * 
 */

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

