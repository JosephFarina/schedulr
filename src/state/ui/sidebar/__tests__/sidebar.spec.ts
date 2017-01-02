import * as I from './../../../../models'
import * as Actions from './../action'
import sidebar, { initialState } from './../reducer'

describe('SidebarUI', () => {

  describe('change sidebar scheudle mode', () => {

    it('set mode to edit shift', () => {
      const res = sidebar(undefined, Actions.setSidebarModeToEditShift())
      const expected: I.ScheduleSidebarMode = 'editShift'
      expect(res.mode).toEqual(expected)
    })

    it('set mode to filter shift', () => {
      const res = sidebar(undefined, Actions.setSidebarModeToFilter())
      const expected: I.ScheduleSidebarMode = 'filter'
      expect(res.mode).toEqual(expected)
    })

    it('set mode to new shift', () => {
      const res = sidebar(undefined, Actions.setSidebarModeToNewShift())
      const expected: I.ScheduleSidebarMode = 'newShift'
      expect(res.mode).toEqual(expected)
    })

    it('set mode to inspector', () => {
      const res = sidebar(undefined, Actions.setSidebarModeToInspector())
      const expected: I.ScheduleSidebarMode = 'inspector'
      expect(res.mode).toEqual(expected)
    })

  })

})