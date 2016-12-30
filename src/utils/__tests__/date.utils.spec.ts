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

  describe('generating calendar builds', () => {
    let start: M.Moment
    let end: M.Moment

    beforeEach(() => {
      start = DateUtils.startOfWeek()
      end = DateUtils.endOfWeek()
    })

    // Is checking if there is only one week key 
    // there is only one cuase the current start and end is just one week
    function checkWeekKeys(calendarObject: Models.CalendarObject<any>) {
      const { weeks } = calendarObject
      const weekKeys = Object.keys(weeks)
      expect(weekKeys.length).toEqual(1)
    }

    function getEachWeeksDayKeys(calendarObject: Models.CalendarObject<any>): number[][] {
      const { weeks } = calendarObject
      return Object.keys(weeks).map((weekNum) => {
        const { year, days} = weeks[weekNum]
        return Object.keys(days).map((dayNum) => +dayNum)
      })
    }

    describe('#generateCalendarBuildDateOnly', () => {
      let range: Models.CalendarObject<Models.DateOnly>

      beforeEach(() => {
        range = DateUtils.generateCalendarBuildDateOnly(start, end)
      })

      it('should have as many weeks as there in the range', () => {
        checkWeekKeys(range)
      })

      it('each week should have 7 days', () => {
        getEachWeeksDayKeys(range).forEach((days: any[]) => {
          expect(days.length).toEqual(7)
        })
      })

    })

    describe('#generateCalendarBuildWithShifts', () => {
      let range: Models.CalendarObject<Models.DayWithShifts>

      const shifts: Models.Shifts = {
        '0asdfvadadv': {
          duration: 15,
          startTime: start.clone().day(0).format()
        },
        '2asfsadfsdfva': {
          duration: 13534,
          startTime: start.clone().day(2).format()
        },
        'asdfdffaavva3': {
          duration: 123543,
          startTime: start.clone().day(3).format()
        },
        'asdfsdaf6': {
          duration: 545,
          startTime: start.clone().day(6).format()
        }
      }

      beforeEach(() => {
        range = DateUtils.generateCalendarBuildWithShifts(
          start,
          end,
          shifts
        )
      })

      function findAllShiftsInDay(
        shifts: Models.Shifts, day: number, week: number, year: number
      ) {
        return Object.keys(shifts).filter((shiftId) => {
          const shiftDate = M(shifts[shiftId].startTime)
          if (
            shiftDate.day() === day &&
            shiftDate.week() === week &&
            shiftDate.year() === year
          ) {
            return true
          } else {
            return false
          }
        })
      }

      it('should have as many weeks as there in the range', () => {
        checkWeekKeys(range)
      })

      // it('check if ', () => {
      //   Object.keys(range.weeks).forEach((weekNumber) => {
      //     const week: Models.Week<Models.DayWithShifts> = range.weeks[weekNumber]
      //     const year = week.year
      //     Object.keys(week.days).forEach((dayNumber) => {
      //       const day: Models.DayWithShifts = week.days[dayNumber]
      //       day.shifts
      //     })
      //   })
      // })

    })

  })

  describe('#getWeekFromMonth', () => {

    it('should look at the week entered and return the most common month', () => {
      const month = DateUtils.getMonthFromWeek(10, 2016)
      expect(month).toEqual(2)
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
