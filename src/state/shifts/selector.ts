// import { createSelector } from 'reselect'
// import * as M from 'moment'

import {
  MorString,
  cloneOrCreateMo,
} from './../../utils/momentHelpers.util'

import * as I from './../../models'
// import * as CalendarSelectors from './../calendar/selector'

export const getShifts = (state: I.RState): I.Shifts => state.shifts.shifts
export const getShiftIds = (state: I.RState): string[] => state.shifts.ids

// FIXME: When adding in edit functionality it will need to be added her so it updates
// export const getShiftBuild = createSelector(
//   getShiftIds,
//   CalendarSelectors.getStartDay,
//   CalendarSelectors.
//   (shiftIds, startDay): Models.CalendarObject<Models.DayWithShifts>  => {
//     return
//   }
// )

export function getShiftsByDay(inputDate: MorString, shifts: I.Shifts): I.Shift[] {
  const date = cloneOrCreateMo(inputDate)

  if (shifts) {
    return Object.keys(shifts).filter((shiftId) => {
      const shift = shifts[shiftId]
      return date.isSame(shift.startTime, 'day')
    }).map(id => shifts[id])
  }
}

