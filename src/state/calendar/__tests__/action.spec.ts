import * as M from 'moment'

import * as Actions from './../action'
import calendar, { initialState } from './../reducer'
import * as Models from 'src/models'

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
    date: M().format()
  }

  const monthState: Models.RCalendar = {
    timeRange: 'month',
    date: M().format()
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
