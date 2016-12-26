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

  describe('#getWeekRange', () => {
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
      expect(Object.keys(timeRange)).toEqual(weeks)
    })

    it('each day should have the correct start and end time', () => {
      Object.keys(timeRange).forEach((key) => {
        const week = timeRange[key]
        const startDate = M().day(0).week(+key).startOf('day').format()
        const endDate = M().day(6).week(+key).startOf('day').format()

        expect(week.startDate).toEqual(startDate)
        expect(week.endDate).toEqual(endDate)
      })
    })

    it('each weeks days should have keys 0 - 6', () => {
      Object.keys(timeRange).forEach((key) => {
        const week: Models.Week = timeRange[key]
        const dayKeys = Object.keys(week.days)
        expect(dayKeys).toEqual('0123456'.split(''))
      })
    })

    it('should say if is the current day', () => {
      Object.keys(timeRange).forEach((weekKey) => {
        const week: Models.Week = timeRange[weekKey]
        Object.keys(week.days).forEach((dayKey) => {
          const day: Models.Day = week.days[dayKey]
          expect(M(day.date).isSame(M(), 'day')).toEqual(day.isToday)
        })
      })
    })

  })
})
