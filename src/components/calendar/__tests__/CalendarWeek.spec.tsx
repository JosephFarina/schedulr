import {
  ReactWrapper,
  mount,
} from 'enzyme'
import * as M from 'moment'
import * as React from 'react'

import * as Models from './../../../models/index'
import CalendarDay from './../CalendarDay'
import CalendarWeek from './../CalendarWeek'

describe('Calendar', () => {

  describe('Month View', () => {
    const week: Models.Week<Models.DayOnly> = {
      year: 2017,
      days: {
        0: {} as Models.DayOnly,
        1: {} as Models.DayOnly,
        2: {} as Models.DayOnly,
        3: {} as Models.DayOnly,
        4: {} as Models.DayOnly,
        5: {} as Models.DayOnly,
        6: {} as Models.DayOnly,
      },
    }

    let wrapper: ReactWrapper<any, {}>

    beforeEach(() => {
      wrapper = mount(<CalendarWeek {...week} />)
    })

    it('should render', () => {
      mount(<CalendarWeek {...week} />)
    })

    it('should have the same number of days as there are days in the week', () => {
      expect(wrapper.find(CalendarDay).length).toEqual(
        Object.keys(week.days).length)
    })
  })

})
