import { UIActions } from './../../actionTypes'

import {
  Action,
  RSidebar,
  ScheduleSidebarMode
} from 'src/models'

export const initialState: RSidebar = {
  mode: 'filter'
}

const sidebar = (state = initialState, action: Action<RSidebar>): RSidebar => {
  switch (action.type) {

    case UIActions.changeScheduleSidebarMode:
      return Object.assign({}, state, {
        mode: action.payload.mode
      })

    default:
      return state
  }

}

export default sidebar
