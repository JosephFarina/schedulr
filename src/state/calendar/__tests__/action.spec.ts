import * as M from 'moment'

import * as Models from './../../../models'
import calendar, { initialState } from './../../calendar/reducer'
import * as Actions from './../action'

let initialWeekState: Models.RState = {
  calendar: Object.assign({}, initialState)
}

describe('ACTIONS Calendar', () => {

  beforeEach(() => {
    initialWeekState = {
      calendar: Object.assign({}, initialState)
    }
  })

  const weekState: Models.RCalendar = {
    timeRange: 'week',
    startDate: M().format()
  }

  const monthState: Models.RCalendar = {
    timeRange: 'month',
    startDate: M().format()
  }

  it('#switchTimeRangeToMonth', () => {
    const state = calendar(weekState, Actions.switchTimeRangeToMonth())
    expect(state).toEqual(monthState)
  })

  it('#switchTimeRangeToWeek', () => {
    const state = calendar(monthState, Actions.switchTimeRangeToWeek())
    expect(state).toEqual(weekState)
  })

})
