import * as M from 'moment'
import {
  Action,
  RShiftEditor,
  Shift
} from 'src/models'
import { ShiftActions } from 'src/state/actionTypes'

import {
  MorString,
  cloneOrCreateMo,
  nextMonth,
  previousMonth
} from 'src/utils'

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
 * Update shift date
 * 
 */

export function updateShiftDate(_date: MorString): Action<string> {
  const date = cloneOrCreateMo(_date).hour(12).minutes(0)
  return {
    type: ShiftActions.updateShiftDate,
    payload: date.format()
  }
}

/**
 * 
 * Update date picker Date
 * 
 */

export function nextDatePickerMonth(date: MorString): Action<string> {
  return {
    type: ShiftActions.updateDatePickerDate,
    payload: nextMonth(date).format()
  }
}

export function previousDatePickerMonth(date: MorString): Action<string> {
  return {
    type: ShiftActions.updateDatePickerDate,
    payload: previousMonth(date).format()
  }
}

export function currentDatePickerMonth(): Action<string> {
  return {
    type: ShiftActions.updateDatePickerDate,
    payload: M().format()
  }
}

/**
 * 
 * update shift
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
