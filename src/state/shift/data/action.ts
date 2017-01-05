import {
  Action,
  RShiftData,
  Shift
} from './../../../models'
import { convertShiftArrayToObject } from './../../../utils/convertShifts'
import { ActionTypes } from './../../actionTypes'

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
    type: ActionTypes.addShifts,
    payload: convertShiftArrayToObject(shifts)
  }
}

export function removeAddedShifts(shifts: Shift[]): Action<string[]> {
  return {
    type: ActionTypes.removeAddedShifts,
    payload: shifts.map(shift => shift.id)
  }
}

/**
 * Add an edited shift / remove an edited shift
 */

export function editShifts(shifts: Shift[]): Action<RShiftData> {
  return {
    type: ActionTypes.editShifts,
    payload: convertShiftArrayToObject(shifts)
  }
}

export function removeEditedShifts(shifts: Shift[]): Action<string[]> {
  return {
    type: ActionTypes.removeEditedShifts,
    payload: shifts.map(shift => shift.id)
  }
}

/**
 * Add a deleted shift / remove a deleted shift
 */

export function deleteShifts(shifts: Shift[]): Action<string[]> {
  return {
    type: ActionTypes.deleteShifts,
    payload: shifts.map(shift => shift.id)
  }
}

export function removeDeletedShifts(shifts: Shift[]): Action<string[]> {
  return {
    type: ActionTypes.removeDeletedShifts,
    payload: shifts.map(shift => shift.id)
  }
}
