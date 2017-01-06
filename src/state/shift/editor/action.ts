import {
  Action,
  RShiftEditor,
  Shift
} from './../../../models'
import { ActionTypes } from './../../actionTypes'

/**
 * 
 * Adding and removing employees from the new shift
 * 
 */

export function addEmployeeToShift(employeeId: string): Action<RShiftEditor> {
  return {
    type: ActionTypes.addEmployeeToShift,
    payload: employeeId
  }
}

export function removeEmployeeFromShift(employeeId: string): Action<RShiftEditor> {
  return {
    type: ActionTypes.removeEmployeeFromShift,
    payload: employeeId
  }
}

/**
 * 
 * 
 * 
 */

export function updateNewShift(shift: Shift): Action<Shift> {
  return {
    type: ActionTypes.updateNewShift,
    payload: Object.assign({}, shift)
  }
}

export function clearShiftEditor(): Action<RShiftEditor> {
  return {
    type: ActionTypes.clearShiftEditor,
    payload: {
      newShift: null,
      selectedShift: null
    }
  }
}