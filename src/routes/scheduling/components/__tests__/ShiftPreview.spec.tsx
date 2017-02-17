import { shallow } from 'enzyme'
import * as M from 'moment'
import * as React from 'react'

import {
  ShiftPreview
} from './../'

import {
  Shift
} from 'src/models'

const styles = require('./../ShiftPreview.css')

const shift: Shift = {
  client: 'asf',
  duration: 240,
  employee: null,
  startTime: M().format(),
  location: 'qewfsgrrrgef'
}

let wrapper = shallow(<ShiftPreview shift={shift} onRequestDelete={() => { } } />)

describe('ShiftPreview', () => {

  beforeEach(() => {
    wrapper = shallow(<ShiftPreview shift={shift} onRequestDelete={() => { } } />)
  })

  it('if there is no employee it should say "Open Shite"', () => {
    expect(wrapper.text()).toContain("Open Shift")
  })

  it('should have a formated startTime', () => {
    const expectedStartTime = M(shift.startTime).format('hh:mmA')
    expect(wrapper.text()).toContain(expectedStartTime)
  })

  it('should have the proper formated endTime', () => {
    const expectedEndTime = M(shift.startTime).add(shift.duration, 'minute').format('hh:mmA')
    expect(wrapper.text()).toContain(expectedEndTime)
  })

  it('duration if a single hour should have proper tense', () => {
    const newShift = Object.assign({}, shift)
    newShift.duration = 60
    wrapper = shallow(<ShiftPreview shift={newShift} onRequestDelete={() => { } } />)
    expect(wrapper.text()).toContain('1 Hour')
  })

  it('duration should have proper tense and be 2 decimals long for all other hours that arent ', () => {
    const newShift = Object.assign({}, shift)
    newShift.duration = 15
    wrapper = shallow(<ShiftPreview shift={newShift} onRequestDelete={() => { } } />)
    expect(wrapper.text()).toContain('.25 Hours')
  })

  it('there shouldnt be a delete option if the shift employees is empty', () => {
    const d = wrapper.find(`.${styles.showDelete}`)
    expect(d.length).toEqual(0)
  })

  it('there should be a delete option if the shift employees is not empty', () => {
    const newShift = Object.assign({}, shift)
    newShift.employee = '13qeafddkjfs'
    wrapper = shallow(<ShiftPreview shift={newShift} onRequestDelete={() => { } } />)
    const d = wrapper.find(`.${styles.showDelete}`)
    expect(d.length).toEqual(1)
  })

})
