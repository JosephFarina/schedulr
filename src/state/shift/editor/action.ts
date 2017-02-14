import { Option } from 'react-select'
import * as M from 'moment'
import {
  Action,
  RShiftEditor,
  ShiftTemplate,
  ValidatorResponseObject
} from 'src/models'

import { ShiftActions } from 'src/state/actionTypes'

import {
  MorString,
  cloneOrCreateMo,
  nextMonth,
  previousMonth,
  timeDuration
} from 'src/utils'

import {
  getShiftBeingCreated,
  newShiftValidator
} from './../'

import {
  triggerNotification
} from 'src/state/ui/notification'

import {
  openNewShiftApprovalModal
} from 'src/state/ui/modal'


export function setEmployeesInShift(employees: Option[]): Action<RShiftEditor> {
  return {
    type: ShiftActions.setEmployeesInShift,
    payload: employees.map(option => option.value)
  }
}

export const setClientInShift = (client: Option) => (dispatch, getState) => {
  dispatch({
    type: ShiftActions.setClientInShift,
    payload: client ? client.value : ''
  })
  dispatch(setLocationInShift(''))
}

export function setLocationInShift(location: Option): Action<RShiftEditor> {
  return {
    type: ShiftActions.setLocationInShift,
    payload: location ? location.value : ''
  }
}

export function setShiftDate(date: MorString): Action<string> {
  return {
    type: ShiftActions.updateShiftDate,
    payload: cloneOrCreateMo(date).hour(12).minutes(0).format()
  }
}

export const setShiftTime = (times: M.Moment[]) => (dispatch, getState) => {
  if (times !== null) {
    const [start, end] = times
    dispatch({
      type: ShiftActions.setShiftTimeAndDuration,
      payload: {
        startTime: start.format(),
        duration: timeDuration(start, end)
      }
    })
  } else {
    // if time is invalid it will be null instead of an array -- set state to null for error checking
    dispatch({
      type: ShiftActions.setShiftTimeAndDuration,
      payload: {
        startTime: null,
        duration: null
      }
    })
  }
}

export function generateShifts() {
  return (dispatch: Function, getState: Function): void => {
    const validationErrors = newShiftValidator(getState())

    if (validationErrors === null) {
      dispatch(openNewShiftApprovalModal())
    } else {
      dispatch(alertUserOfErrorsInNewShift(validationErrors))
    }
  }
}

















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

export function updateNewShift(shift: ShiftTemplate): Action<ShiftTemplate> {
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
      // selectedShift: null
    }
  }
}


/**
 * 
 * Generate Shifts
 * 
 */



export function alertUserOfErrorsInNewShift(errors: ValidatorResponseObject<ShiftTemplate>): (dispatch: any, getState: any) => any {
  const messages: string[] = Object.keys(errors).map(i => errors[i])
  return triggerNotification(messages)
}

/**
 * 
 * Reset editor back to defaults
 * 
 */

export function resetShiftEditor(): Action<RShiftEditor> {
  return {
    type: ShiftActions.resetEditor,
    payload: null
  }
}
