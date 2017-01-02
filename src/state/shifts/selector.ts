import {
  MorString,
  cloneOrCreateMo,
} from './../../utils/momentHelpers.util'

import * as I from './../../models'

function getRawShifts(state: I.RState): I.Shifts {
  return state.shifts.shifts
}

function getEditedShifts(state: I.RState): I.Shifts {
  return state.shifts.editedShifts
}

function getAddedShifts(state: I.RState): I.Shifts {
  return state.shifts.addedShifts
}

function getDeletedShifts(state: I.RState): string[] {
  return state.shifts.deletedShifts
}

export function getShifts(state: I.RState): I.Shift[] {
  const rawShifts = getRawShifts(state)
  const editedShifts = getEditedShifts(state)
  const addedShifts = getAddedShifts(state)
  const deletedShifts = getDeletedShifts(state)

  // assign shifts in the order of raw -- added -- edited. This is so edited will override addedshifts 
  // deleting shift purposfully comes after this so that it overrides and added or edited
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

