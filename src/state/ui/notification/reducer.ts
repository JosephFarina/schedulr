import { UIActions } from './../../actionTypes'

import {
  Action,
  RNotification
} from 'src/models'

export const initialState: RNotification = {
  messages: null
}

const notification = (state = initialState, action: Action<RNotification>): RNotification => {
  switch (action.type) {

    case UIActions.updateNotifcationState:
      return Object.assign({}, state, action.payload)

    default:
      return state
  }

}

export default notification
