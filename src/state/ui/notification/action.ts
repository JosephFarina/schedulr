import {
  Action,
  RNotification
} from 'src/models'

import {
  UIActions
} from 'src/state/actionTypes'

import {
  notificationIsSelected
} from './'

export function triggerNotification(messages: string[], duration = 2000) {
  return (dispatch: any, getState: any) => {
    if (!notificationIsSelected(getState())) {
      dispatch(setMessagesToAlert(messages))
      setTimeout(() => { dispatch(resetNotifications()) }, duration)
    }
  }
}

export function setMessagesToAlert(messages: string[]): Action<RNotification> {
  return {
    type: UIActions.updateNotifcationState,
    payload: { messages: Object.assign([], messages) }
  }
}

export function resetNotifications(): Action<RNotification> {
  return {
    type: UIActions.updateNotifcationState,
    payload: { messages: null }
  }
}
