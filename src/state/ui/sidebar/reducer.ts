import { ActionTypes } from './../../actionTypes'

import {
  Action,
  RSidebar,
  ScheduleSidebarMode
} from './../../../models'

export const initialState: RSidebar = {
  mode: 'filter'
}

const sidebar = (state = initialState, action: Action<RSidebar>): RSidebar => {
  switch (action.type) {

    case ActionTypes.changeScheduleSidebarMode:
      return Object.assign({}, state, {
        mode: action.payload.mode
      })

    default:
      return state
  }

}

export default sidebar
