import * as M from 'moment'
require('moment-range')

import * as Models from './../../models'
import * as DateUtils from './../date.utils'

const checkForMomentEquality = (start: M.Moment, end: M.Moment) => {
  expect(start.format()).toEqual(end.format())
}

describe('Date Utils', () => {

  describe('#startOfMonth', () => {

    it('should not mutate original date', () => {
      const today = M()
      const todayCloned = today.clone()
      DateUtils.startOfMonth(todayCloned)
      checkForMomentEquality(today, todayCloned)
    })

    it('should output the expected day', () => {
      const expectedDate = M().startOf('month').startOf('week').startOf('day')
      expect(DateUtils.startOfMonth(M()).format()).toEqual(expectedDate.format())
    })

  })

  describe('#endOfMonth', () => {

    it('should not mutate', () => {
      const today = M()
      const todayCloned = today.clone()
      DateUtils.endOfMonth(todayCloned)
      checkForMomentEquality(today, todayCloned)
    })

    it('should output the expected day', () => {
      const expectedDate = M().endOf('month').endOf('week').startOf('day')
      checkForMomentEquality(
        DateUtils.endOfMonth(M()),
        expectedDate
      )
    })

  })

  describe('#getTimeRangeBuild', () => {
    let range: M.Range
    let timeRange: Models.TimeRange

    beforeEach(() => {
      range = M.range([
        DateUtils.startOfMonth(M()),
        DateUtils.endOfMonth(M())
      ])
      timeRange = DateUtils.getTimeRangeBuild(range)
    })

    it('should have as many keys as there are weeks in the range', () => {
      const weeks = DateUtils.getWeeksInRange(range)
      expect(Object.keys(timeRange.weeks)).toEqual(weeks)
    })

    it('each day should have the correct start and end time', () => {
      const weeks = timeRange.weeks

      Object.keys(weeks).forEach((key) => {
        const week = weeks[key]
        const startDate = M().day(0).week(+key).startOf('day').format()
        const endDate = M().day(6).week(+key).startOf('day').format()

        expect(week.startDate).toEqual(startDate)
        expect(week.endDate).toEqual(endDate)
      })
    })

    it('each weeks days should have keys 0 - 6', () => {
      const weeks = timeRange.weeks

      Object.keys(weeks).forEach((key) => {
        const week: Models.Week = weeks[key]
        const dayKeys = Object.keys(week.days)
        expect(dayKeys).toEqual('0123456'.split(''))
      })
    })

    it('should say if is the current day', () => {
      const weeks = timeRange.weeks

      Object.keys(weeks).forEach((weekKey) => {
        const week: Models.Week = weeks[weekKey]
        Object.keys(week.days).forEach((dayKey) => {
          const day: Models.Day = week.days[dayKey]
          expect(M(day.date).isSame(M(), 'day')).toEqual(day.isToday)
        })
      })
    })

  })

  describe('#nextRange', () => {

    it('should get next month if time range is month', () => {
      testRangeChangedProperly('next', 'month')
    })

    it('should get the next week if time range is week', () => {
      testRangeChangedProperly('prev', 'week')
    })

  })

  describe('#previousRange', () => {

    it('should get previous month if time range is month', () => {
      testRangeChangedProperly('prev', 'month')
    })

    it('should get previous week if time range is week', () => {
      testRangeChangedProperly('prev', 'week')
    })

  })

  describe('#currentRange', () => {

    it('should get curr month if time range is month', () => {
      testRangeChangedProperly('curr', 'month')
    })

  })
})

declare type timeChanger = 'next' | 'prev' | 'curr'
function testRangeChangedProperly(type: timeChanger, timeRange: Models.TimeRangeOption) {
  const currMonth = M().month()
  const currWeek = DateUtils.startOfWeek(M()).week()
  let startDate
  let expectedStartDate

  // WILL NEED TO CHANGE IF THERE ARE MORE TYPES THAN JUST WEEK OR MONTH
  const state: Models.RCalendar = {
    month: currMonth,
    startDate: timeRange === 'week' ? DateUtils.startOfWeek(M()).format() : DateUtils.startOfMonth(M()).format(),
    timeRange,
  }

  let newWeek
  let newMonth

  if (type === 'next') {
    newWeek = currWeek + 1
    newMonth = currMonth + 1
  } else if (type === 'prev') {
    newWeek = currWeek - 1
    newMonth = currMonth - 1
  } else if (type === 'curr') {
    newWeek = M().week()
    newMonth = M().month()
  }

  if (timeRange === 'month') {
    expectedStartDate = DateUtils.startOfMonth(M().month(newMonth)).format()
  } else if (timeRange === 'week') {
    expectedStartDate = DateUtils.startOfWeek(M()).week(newWeek).format()
  }

  if (type === 'next') {
    startDate = DateUtils.nextRange(state)
  } else if (type === 'prev') {
    startDate = DateUtils.previousRange(state)
  } else if (type === 'curr') {
    startDate = DateUtils.currentRange(state)
  }

  expect(startDate).toEqual(expectedStartDate)
}
