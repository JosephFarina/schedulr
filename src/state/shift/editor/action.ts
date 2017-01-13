import * as M from 'moment'
import {
  Action,
  RShiftEditor,
  RUI,
  Shift,
  ValidatorResponseObject
} from 'src/models'

import { ShiftActions } from 'src/state/actionTypes'

import {
  MorString,
  cloneOrCreateMo,
  nextMonth,
  previousMonth
} from 'src/utils'

import {
  getShiftBeingCreated,
  shiftEditorValidator
} from './../'

import {
  trggerNotification
} from 'src/state/ui/notification'

import {
  openNewShiftApprovalModal
} from 'src/state/ui/modal'

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


/**
 * 
 * Generate Shifts
 * 
 */

export function generateShifts() {
  return (dispatch: Function, getState: Function): void => {
    const shift = getShiftBeingCreated(getState())
    const validationErrors = shiftEditorValidator(shift)

    if (validationErrors === null) {
      dispatch(openNewShiftApprovalModal())
    } else {
      dispatch(alertUserOfErrorsInNewShift(validationErrors))
    }
  }
}

export function alertUserOfErrorsInNewShift(errors: ValidatorResponseObject<Shift>): (dispatch: any, getState: any) => any {
  const messages: string[] = Object.keys(errors).map(i => errors[i])
  return trggerNotification(messages)
}
