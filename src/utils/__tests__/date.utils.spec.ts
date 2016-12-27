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
      const currMonth = currentMonth()
      const state = monthState(currMonth)
      const expectedStartDate = expectedMonth(currMonth + 1)
      const nextRange = DateUtils.nextRange(state)

      expect(nextRange).toEqual(expectedStartDate)
    })

    it('should get the next week if time range is week', () => {
      const currWeek = currentWeek()
      const state = weekState(currWeek)
      const expectedStartDate = expectedWeek(currWeek + 1)
      const nextRange = DateUtils.nextRange(state)

      expect(nextRange).toEqual(expectedStartDate)
    })

  })

  describe('#previousRange', () => {

    it('should get previous month if time range is month', () => {
      const currMonth = currentMonth()
      const state = monthState(currMonth)
      const expectedStartDate = expectedMonth(currMonth - 1)
      const prevRange = DateUtils.previousRange(state)

      expect(prevRange).toEqual(expectedStartDate)
    })

    it('should get previous week if time range is week', () => {
      const currWeek = currentWeek()
      const state = weekState(currWeek)
      const expectedStartDate = expectedWeek(currWeek - 1)
      const prevRange = DateUtils.previousRange(state)

      expect(prevRange).toEqual(expectedStartDate)
    })

  })

  describe('#currentRange', () => {

    // FIXME: Make the the state have a random week and start date to test if it 
    // brings it back to the curr date properly

    it('should get curr month if time range is month', () => {
      const currMonth = currentMonth()
      const state = monthState(currMonth)
      const expectedStartDate = expectedMonth(currMonth)
      const currRange = DateUtils.currentRange(state)

      expect(currRange).toEqual(expectedStartDate)
    })

    it('should get curr week if time range is week', () => {
      const currWeek = currentWeek()
      const state = weekState(currWeek)
      const expectedStartDate = expectedWeek(currWeek)
      const currRange = DateUtils.currentRange(state)

      expect(currRange).toEqual(expectedStartDate)
    })

  })

})

function monthState(currMonth: number): Models.RCalendar {
  return {
    month: currMonth,
    startDate: DateUtils.startOfMonth(M()).format(),
    timeRange: 'month'
  }
}

function weekState(currWeek: number): Models.RCalendar {
  return {
    startDate: DateUtils.startOfWeek(M()).format(),
    timeRange: 'week'
  }
}

function currentMonth(): number {
  return M().month()
}

function currentWeek() {
  return DateUtils.startOfWeek(M()).week()
}

function expectedWeek(weekNum: number) {
  return DateUtils.startOfWeek(M()).week(weekNum).format()
}

function expectedMonth(monthNum: number) {
  return DateUtils.startOfMonth(M().month(monthNum)).format()
}
