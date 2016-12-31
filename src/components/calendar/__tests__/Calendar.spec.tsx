import {
  CommonWrapper,
  mount,
} from 'enzyme'
import * as M from 'moment'
import * as React from 'react'

import Calendar from './../Calendar'
import CalendarDay from './../CalendarDay'
import CalendarHeader from './../CalendarHeader'
import CalendarMonth from './../CalendarMonth'
import CalendarWeek from './../CalendarWeek'

const styles = require('./../Shared.css')

describe('CalendarMonth', () => {
  let wrapper: CommonWrapper<any, any>
  beforeEach(() => {
    wrapper = mount(<Calendar />)
  })

  it('should mount', () => {
    mount(<Calendar />)
  })

  describe('it should render months or weeks', () => {
    it('should only have one week if week param is provided', () => {
      wrapper = mount(<Calendar week={M()} />)
      const weeks = wrapper.find(CalendarWeek)
      const months = wrapper.find(CalendarMonth)
      expect(weeks.length).toEqual(1)
      expect(months.length).toEqual(0)
    })

    it('should render month if a month param is provided', () => {
      wrapper = mount(<Calendar month={M()} />)
      const months = wrapper.find(CalendarMonth)
      expect(months.length).toEqual(1)
    })
  })

  describe('If Not A CalendarWidget/DatePicker', () => {

    it('weeks should have normal classes', () => {
      const weeks = wrapper.find(CalendarWeek)
      weeks.forEach((week) => {
        expect(week.hasClass(styles.week)).toBeTruthy()
        expect(week.hasClass(styles['week--widget'])).toBeFalsy()
      })
    })

    it('container should have normal class', () => {
      const container = wrapper.find('.' + styles.container)
      expect(container.length).toEqual(1)
    })

    it('days should have normal classes', () => {
      const days = wrapper.find(CalendarDay)
      days.forEach((day) => {
        expect(day.hasClass(styles.day)).toBeTruthy()
        expect(day.hasClass(styles['day--widget'])).toBeFalsy()
      })
    })

    it('header should have normal class', () => {
      const header = wrapper.find(CalendarHeader)
      const classes = styles.header.split(' ')
      classes.forEach((c: string) => {
        expect(header.hasClass(c)).toEqual(true)
      })
    })

    it('headers days should have widget class', () => {
      const header = wrapper.find(CalendarHeader)
      const days = header.find('.' + styles.day)
      expect(days.length).toEqual(7)
    })

  })

  describe('If A CalenderWidget/DatePicker', () => {
    beforeEach(() => {
      wrapper = mount(<Calendar isDatePicker={true} />)
    })

    it('weeks should have widget classes', () => {
      const weeks = wrapper.find(CalendarWeek)
      weeks.forEach((week) => {
        expect(week.hasClass(styles.weekWidget)).toBeTruthy()
      })
    })

    it('container should have widget class', () => {
      const container = wrapper.find('.' + styles.containerWidget)
      expect(container.length).toEqual(1)
    })

    it('days should have widget classes', () => {
      const days = wrapper.find(CalendarDay)
      days.forEach((day) => {
        expect(day.hasClass(styles.dayWidget)).toBeTruthy()
      })
    })

    it('header should have widget class', () => {
      const header = wrapper.find(CalendarHeader)
      const classes = styles.headerWidget
      expect(header.hasClass(classes)).toEqual(true)
      // classes.forEach((c: string) => {
      // })
    })

    it('headers days should have widget class', () => {
      const header = wrapper.find(CalendarHeader)
      const days = header.find('.' + styles.dayWidget)
      expect(days.length).toEqual(7)
    })

  })

})
