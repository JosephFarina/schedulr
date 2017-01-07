import {
  Action,
  RSidebar,
  RState,
  ScheduleSidebarMode
} from 'src/models'

export function getScheduleSidebarMode(state: RState): ScheduleSidebarMode {
  return state.ui.sidebar.mode
}
