import {
  ScheduleSidebarMode,
  Action,
  RSidebar
} from 'src/models'
import { UIActions } from 'src/state/actionTypes'

// Change sidebar mode
function changeSidebarMode(mode: ScheduleSidebarMode): Action<RSidebar> {
  return {
    type: UIActions.changeScheduleSidebarMode,
    payload: { mode }
  }
}

export function setSidebarModeToFilter(): Action<RSidebar> {
  return changeSidebarMode('filter')
}

export function setSidebarModeToInspector(): Action<RSidebar> {
  return changeSidebarMode('inspector')
}

export function setSidebarModeToEditShift(): Action<RSidebar> {
  return changeSidebarMode('editShift')
}

export function setSidebarModeToNewShift(): Action<RSidebar> {
  return changeSidebarMode('newShift')
}
