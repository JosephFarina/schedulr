import {
  Action,
  RShiftEditor,
  Shift
} from 'src/models'
import { ShiftActions } from 'src/state/actionTypes'

/**
 * 
 * Adding and removing employees from the new shift
 * 
 */

export function addEmployeeToShift(employeeId: string): Action<RShiftEditor> {
  return {
    type: ShiftActions.addEmployeeToShift,
    payload: employeeId
  }
}

export function removeEmployeeFromShift(employeeId: string): Action<RShiftEditor> {
  return {
    type: ShiftActions.removeEmployeeFromShift,
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
    type: ShiftActions.updateNewShift,
    payload: Object.assign({}, shift)
  }
}

export function clearShiftEditor(): Action<RShiftEditor> {
  return {
    type: ShiftActions.clearShiftEditor,
    payload: {
      newShift: null,
      selectedShift: null
    }
  }
}
