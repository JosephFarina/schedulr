import { UIActions } from './../../actionTypes'

import {
  Action,
  RAlert
} from 'src/models'

export const initialState: RAlert = {
  type: null,
  message: null
}

const alert = (state = initialState, action: Action<RAlert>): RAlert => {
  switch (action.type) {

    case UIActions.updateAlertState:
      return Object.assign({}, state, action.payload)

    default:
      return state
  }

}

export default alert
