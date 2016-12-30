import * as M from 'moment'

import * as Models from './../../../models'
import * as Selector from './../selector'

describe('Calendar Selector', () => {
  it('getCurrentTimeRange should return the proper range object', () => {
    const timeRange: Models.CalendarObject<Models.DayOnly> = Selector.getTimeRangeBuild({
      calendar: {
        startDate: M().format(),
        timeRange: 'week'
      }
    })

    expect(Object.keys(timeRange.weeks).length).toEqual(1)

    Object.keys(timeRange.weeks).forEach((weekKey) => {
      expect(Object.keys(timeRange.weeks[weekKey].days).length).toEqual(7)
    })
  })
})
