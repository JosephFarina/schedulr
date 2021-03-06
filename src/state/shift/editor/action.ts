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
  timeDuration
} from 'src/utils'

import * as Editor from './'

import {
  triggerNotification
} from 'src/state/ui/notification'

import {
  openNewShiftApprovalModal
} from 'src/state/ui/modal'

export function setEmployee(employees: Option[]): Action<RShiftEditor> {
  return {
    type: ShiftActions.setEmployeesInShift,
    payload: employees.map(option => option.value)
  }
}

export const setClient = (client: Option) => (dispatch, getState) => {
  dispatch({
    type: ShiftActions.setClientInShift,
    payload: client ? client.value : ''
  })
  dispatch(setLocation(''))
}

export function setLocation(location: Option): Action<RShiftEditor> {
  return {
    type: ShiftActions.setLocationInShift,
    payload: location ? location.value : ''
  }
}

export function setDate(date: MorString): Action<string> {
  return {
    type: ShiftActions.updateShiftDate,
    payload: cloneOrCreateMo(date).hour(12).minutes(0).format()
  }
}

export function setUnparsedTimeRange(range: string): Action<string> {
  return {
    type: ShiftActions.setUnparsedTimeRange,
    payload: range
  }
}

export const setTime = (times: M.Moment[]) => (dispatch, getState) => {
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

export function generate() {
  return (dispatch: Function, getState: Function): void => {
    const validationErrors = Editor.Validators.newShiftValidator(getState())

    if (validationErrors === null) {
      dispatch(openNewShiftApprovalModal())
    } else {
      dispatch(alertErrors(validationErrors))
    }
  }
}

export function alertErrors(errors: ValidatorResponseObject<ShiftTemplate>): (dispatch: any, getState: any) => any {
  const messages: string[] = Object.keys(errors).map(i => errors[i])
  return triggerNotification(messages)
}

export function reset(): Action<RShiftEditor> {
  return {
    type: ShiftActions.resetEditor,
    payload: null
  }
}

export function addEmployee(employeeId: string): Action<RShiftEditor> {
  return {
    type: ShiftActions.addEmployeeToShift,
    payload: employeeId
  }
}

export function removeEmployee(employeeId: string): Action<RShiftEditor> {
  return {
    type: ShiftActions.removeEmployeeFromShift,
    payload: employeeId
  }
}
