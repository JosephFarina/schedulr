import { mount, CommonWrapper } from 'enzyme'
import * as React from 'react'

import CalendarDay from './../CalendarDay'
import CalendarMonth from './../CalendarMonth'
import CalendarWeek from './../CalendarWeek'

const styles = require('./../Shared.css')

describe('CalendarMonth', () => {
  let wrapper: CommonWrapper<any, any>
  beforeEach(() => {
    wrapper = mount(<CalendarMonth />)
  })

  it('should mount', () => {
    mount(<CalendarMonth />)
  })

  describe('If Not A CalendarWidget/DatePicker', () => {

    it('weeks should have normal classes', () => {
      const weeks = wrapper.find(CalendarWeek)
      weeks.forEach((week) => {
        expect(week.hasClass(styles.week)).toBeTruthy()
        expect(week.hasClass(styles['week--widget'])).toBeFalsy()
      })
    })

    it('days should have normal classes', () => {
      const days = wrapper.find(CalendarDay)
      days.forEach((day) => {
        expect(day.hasClass(styles.day)).toBeTruthy()
        expect(day.hasClass(styles['day--widget'])).toBeFalsy()
      })
    })

  })

  describe('If A CalenderWidget/DatePicker', () => {
    beforeEach(() => {
      wrapper = mount(<CalendarMonth isDatePicker={true} />)
    })

    it('weeks should have widget classes', () => {
      const weeks = wrapper.find(CalendarWeek)
      weeks.forEach((week) => {
        expect(week.hasClass(styles.weekWidget)).toBeTruthy()
      })
    })

    it('days should have widget classes', () => {
      const days = wrapper.find(CalendarDay)
      days.forEach((day) => {
        expect(day.hasClass(styles.dayWidget)).toBeTruthy()
      })
    })

  })

})
