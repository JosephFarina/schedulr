import {
  ReactWrapper,
  mount,
} from 'enzyme'
import * as M from 'moment'
import * as React from 'react'

import * as Models from './../../../models/index'
import * as DateUtils from './../../../utils/date.utils'
import CalendarDay from './../CalendarDay'
import CalendarWeek from './../CalendarWeek'

describe('Calendar', () => {

  describe('Month View', () => {
    const week: Models.Week = {
      days: {
        0: {} as Models.Day,
        1: {} as Models.Day,
        2: {} as Models.Day,
        3: {} as Models.Day,
        4: {} as Models.Day,
        5: {} as Models.Day,
        6: {} as Models.Day,
      },
      endDate: '',
      startDate: '',
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
