import {
  Action,
  RShiftData,
  Shift
} from 'src/models'
import { ShiftActions } from 'src/state/actionTypes'
import { convertShiftArrayToObject } from 'src/utils'

/**
 * 
 * CRUD OPERATIONS FOR SHIFTS
 * 
 */

/** 
 * Add a shift / remove a shift that was added 
 */

export function addShifts(shifts: Shift[]): Action<RShiftData> {
  return {
    type: ShiftActions.addShifts,
    payload: convertShiftArrayToObject(shifts)
  }
}

export function removeAddedShifts(shifts: Shift[]): Action<string[]> {
  return {
    type: ShiftActions.removeAddedShifts,
    payload: shifts.map(shift => shift.id)
  }
}

/**
 * Add an edited shift / remove an edited shift
 */

export function editShifts(shifts: Shift[]): Action<RShiftData> {
  return {
    type: ShiftActions.editShifts,
    payload: convertShiftArrayToObject(shifts)
  }
}

export function removeEditedShifts(shifts: Shift[]): Action<string[]> {
  return {
    type: ShiftActions.removeEditedShifts,
    payload: shifts.map(shift => shift.id)
  }
}

/**
 * Add a deleted shift / remove a deleted shift
 */

export function deleteShifts(shifts: Shift[]): Action<string[]> {
  return {
    type: ShiftActions.deleteShifts,
    payload: shifts.map(shift => shift.id)
  }
}

export function removeDeletedShifts(shifts: Shift[]): Action<string[]> {
  return {
    type: ShiftActions.removeDeletedShifts,
    payload: shifts.map(shift => shift.id)
  }
}
