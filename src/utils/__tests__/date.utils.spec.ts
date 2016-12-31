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

})

function checkIfDayIsSunday(input?: MomentHelpers.MorString): void {
  const isSaturday = MomentHelpers.cloneOrCreateMo(input).day() === 0
  expect(isSaturday).toBeTruthy()
}

function checkIfDayIsSaturday(input?: MomentHelpers.MorString): void {
  const isSunday = MomentHelpers.cloneOrCreateMo(input).day() === 6
  expect(isSunday).toBeTruthy()
}
