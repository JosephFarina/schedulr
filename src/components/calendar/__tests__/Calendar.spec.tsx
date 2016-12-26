import {
  ReactWrapper,
  mount,
} from 'enzyme'
import * as M from 'moment'
import * as React from 'react'

import * as DateUtils from './../../../utils/date.utils'
import Calendar from './../Calendar'
import CalendarWeek from './../CalendarWeek'

describe('Calendar', () => {

  describe('Month View', () => {
    let startDate: M.Moment
    let endDate: M.Moment
    let weeks: string[]
    let wrapper: ReactWrapper<any, {}>

    beforeEach(() => {
      startDate = DateUtils.startOfMonth(M())
      endDate = DateUtils.endOfMonth(M())
      weeks = DateUtils.getWeeksInRange(M.range([
        startDate,
        endDate
      ]))
      wrapper = mount(
        <Calendar
          startDate={startDate.format()}
          endDate={endDate.format()} />
      )
    })

    it('should render', () => {
      mount(<Calendar startDate={startDate.format()} endDate={endDate.format()} />)
    })

    it('should have the same number of weeks as there are weeks in the range', () => {
      expect(wrapper.find(CalendarWeek).length).toEqual(weeks.length)
    })
  })

})
