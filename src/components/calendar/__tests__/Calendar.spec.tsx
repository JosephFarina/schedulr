import {
  ReactWrapper,
  mount,
} from 'enzyme'
import * as M from 'moment'
import * as React from 'react'

import * as DateUtils from './../../../utils/dateHelpers.utils'
import Calendar from './../Calendar'
import CalendarWeek from './../CalendarWeek'

describe('Calendar', () => {

  describe('Month View', () => {

    let wrapper: ReactWrapper<any, {}>
    const timeRange = DateUtils.generateTimeRangeBuild(
      DateUtils.startOfWeek(),
      DateUtils.nextWeek(DateUtils.endOfWeek())
    )

    beforeEach(() => {
      wrapper = mount(
        <Calendar {...timeRange} />
      )
    })

    it('should render', () => {
      mount(<Calendar {...timeRange} />)
    })

    it('should have the same number of weeks as there are weeks in the range', () => {
      expect(wrapper.find(CalendarWeek).length).toEqual(Object.keys(timeRange.weeks).length)
    })
  })

})
