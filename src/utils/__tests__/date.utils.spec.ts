import * as M from 'moment'
require('moment-range')

import * as Models from './../../models'
import * as DateUtils from './../dateHelpers.utils'
import * as MomentHelpers from './../momentHelpers.util'

describe('Date Utils', () => {

  describe('#startOfWeek', () => {

    it('no input should be start of this week', () => {
      const res = DateUtils.startOfWeek()
      checkIfDayIsSunday(res)
    })

    it('moment input should be start of this week', () => {
      const res = DateUtils.startOfWeek(M().add(1, 'week').day(3))
      checkIfDayIsSunday(res)
    })

    it('string input should be start of this week', () => {
      const res = DateUtils.startOfWeek(M().add(1, 'week').day(3).format())
      checkIfDayIsSunday(res)
    })

  })

  describe('#endOfWeek', () => {

    it('no input should be end of this week', () => {
      const res = DateUtils.endOfWeek()
      checkIfDayIsSaturday(res)
    })

    it('moment input should be end of this week', () => {
      const res = DateUtils.endOfWeek(M().add(1, 'week').day(3))
      checkIfDayIsSaturday(res)
    })

    it('string input should be end of this week', () => {
      const res = DateUtils.endOfWeek(M().add(1, 'week').day(3).format())
      checkIfDayIsSaturday(res)
    })

  })

  describe('#nextWeek', () => {

    it('should be both start of week and one week more', () => {
      const initTime = DateUtils.startOfWeek()
      const res = DateUtils.nextWeek(initTime)

      expect(res.week()).toEqual(initTime.clone().add(1, 'week').week())
      checkIfDayIsSunday(res)
    })

  })

  describe('#previousWeek', () => {

    it('should be both start of week and one week behind', () => {
      const initTime = DateUtils.startOfWeek()
      const res = DateUtils.previousWeek(initTime)

      expect(res.week()).toEqual(initTime.clone().subtract(1, 'week').week())
      checkIfDayIsSunday(res)
    })

  })

  describe('#generateTimeRangeBuild', () => {
    const start = DateUtils.startOfWeek()
    let end = DateUtils.endOfWeek()
    let range: Models.TimeRange
    let weekKeys: string[]

    beforeEach(() => {
      range = DateUtils.generateTimeRangeBuild(start, end)
      weekKeys = Object.keys(range.weeks)
    })

    it('should have as many weeks as there in the range', () => {
      expect(weekKeys.length).toEqual(1)

      end = DateUtils.nextWeek(end)
      range = DateUtils.generateTimeRangeBuild(start, end)
      weekKeys = Object.keys(range.weeks)
      expect(weekKeys.length).toEqual(2)
    })

    it('each week should have 7 days', () => {
      weekKeys.forEach((weekKey) => {
        const days: Models.Days = range.weeks[weekKey].days
        const dayKeys = Object.keys(days)
        expect(dayKeys.length).toEqual(7)

        dayKeys.forEach((dayKey: string) => {
          expect(M(days[dayKey].date).day()).toEqual(+dayKey)
        })
      })
    })

  })

})


function checkIfDayIsSunday(input?: MomentHelpers.MorString): void {
  const isSaturday = MomentHelpers.cloneOrCreateMo(input).day() === 0
  expect(isSaturday).toBeTruthy()
}

function checkIfDayIsSaturday(input?: MomentHelpers.MorString): void {
  const isSunday = MomentHelpers.cloneOrCreateMo(input).day() === 6
  expect(isSunday).toBeTruthy()
}
