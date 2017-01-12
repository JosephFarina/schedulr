import {
  Action,
  RNotification
} from 'src/models'

import {
  UIActions
} from 'src/state/actionTypes'

export function trggerNotification(messages: string[], duration = 2000) {
  return (dispatch: any, getState: any) => {
    dispatch(setMessagesToAlert(messages))
    setTimeout(() => { dispatch(resetNotifications()) }, duration)
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
