import * as Models from './../../../models'
import calendar from './../../calendar/reducer'
import * as Actions from './../action'
import * as M from 'moment'

describe('ACTIONS Calendar', () => {
  const time = M().format()
  const weekState: Models.RCalendar = {
    timeRange: 'week',
    startDate: time
  }

  const monthState: Models.RCalendar = {
    timeRange: 'month',
    startDate: time
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
