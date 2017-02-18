import * as React from 'react'
import {
  mount
} from 'enzyme'
// import { Link } from 'react-router'
import { Navigation } from './../Navigation'

const Tabs = require('antd/lib/tabs')

describe('Navigation', () => {
  const scheduleTabName = 'Schedule'
  const scheduleBaseRoute = '/schedule'
  const schedulingRoutePath = [
    { path: '/' },
    { path: 'schedule' },
    { path: 'new-shift' }
  ]

  const employeeTabName = 'Employees'
  const employeeBaseRoute = '/employees'
  const employeeRoutePath = [
    { path: '/' },
    { path: 'employees' },
    { path: 'doesnt-matter' }
  ]

  it('if the route is scheduling it should be the active tab', () => {
    const wrapper = mount(<Navigation router={{ replace: () => { } }} routes={schedulingRoutePath} />)
    const scheduleTab = findTab(wrapper, scheduleTabName)
    expect(scheduleTab.prop('active')).toBe(true)
    expect(scheduleTab.key()).toEqual(scheduleBaseRoute)
  })

  it('if the route is employees it should be the active tab', () => {
    const wrapper = mount(<Navigation router={{ replace: () => { } }} routes={employeeRoutePath} />)
    const employeeTab = findTab(wrapper, employeeTabName)
    expect(employeeTab.prop('active')).toBe(true)
    expect(employeeTab.key()).toEqual(employeeBaseRoute)
  })

})


function findTab(wrapper, tabName) {
  const tabs = wrapper.find(Tabs.TabPane)
  return tabs.findWhere(e => e.prop('tab') === tabName)
}
