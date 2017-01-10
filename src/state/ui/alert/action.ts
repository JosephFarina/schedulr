import {
  Action,
  RAlert
} from 'src/models'

import {
  UIActions
} from 'src/state/actionTypes'

import {
  getAlertInfo
} from './'

import { } from 'redux-thunk'

export const emitSnackbarAlert = (message: string, duration = 2500) => {
  return (dispatch: Function, getState: Function): void => {
    const alert = getAlertInfo(getState())
    if (!alert.type) {
      dispatch(openSnackBarAlert(message))
      setTimeout(() => { dispatch(closeAlert()) }, duration)
    }
  }
}

function openSnackBarAlert(message: string): Action<RAlert> {
  return {
    type: UIActions.updateAlertState,
    payload: {
      message,
      type: 'snackbar'
    }
  }
}

function closeAlert(): Action<RAlert> {
  return {
    type: UIActions.updateAlertState,
    payload: {
      message: null,
      type: null
    }
  }
}
