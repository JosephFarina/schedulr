import { createSelector } from 'reselect'

import * as Models from './../../models'
import * as CalendarSelectors from './../calendar/selector'

export const getShifts = (state: Models.RState): Models.Shifts => state.shifts.shifts
export const getShiftIds = (state: Models.RState): string[] => state.shifts.ids

// FIXME: When adding in edit functionality it will need to be added her so it updates
// export const getShiftBuild = createSelector(
//   getShiftIds,
//   CalendarSelectors.getStartDay,
//   CalendarSelectors.
//   (shiftIds, startDay): Models.CalendarObject<Models.DayWithShifts>  => {
//     return
//   }
// )
