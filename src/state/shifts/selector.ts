import * as Models from './../../models'

export const getShifts = (state: Models.RState) => state.shifts

export const getShiftBuild = (state: Models.RState): Models.CalendarObject<Models.DayWithShifts> => {
  return
}
