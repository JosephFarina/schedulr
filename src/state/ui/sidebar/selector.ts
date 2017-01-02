import {
  Action,
  RSidebar,
  RState,
  ScheduleSidebarMode
} from './../../../models'

export function getScheduleSidebarMode(state: RState): ScheduleSidebarMode {
  return state.ui.sidebar.mode
}
