import {
  mount,
  render,
  shallow,
  ShallowWrapper
} from 'enzyme'
import * as React from 'react'

import PaneSidebar from './../PaneSidebar'

const styles = require('./../PaneSidebar.css')

describe('PaneSidebar', () => {
  let wrapper: ShallowWrapper<any, {}>

  beforeEach(() => {
    wrapper = shallow(<PaneSidebar />)
  })

  it('should only have the default class when no props given', () => {
    expect(wrapper.hasClass(styles.halfScreen)).toBeFalsy()
    expect(wrapper.hasClass(styles.minimized)).toBeFalsy()
    expect(wrapper.hasClass(styles.container)).toBeTruthy()
  })

  it('should maximize when prop is maximized', () => {
    wrapper = shallow(<PaneSidebar maximized={true} />)
    expect(wrapper.hasClass(styles.container)).toBeTruthy()
    expect(wrapper.hasClass(styles.halfScreen)).toBeTruthy()
  })

  it('should minimize when props is minimized', () => {
    wrapper = shallow(<PaneSidebar minimized={true} />)
    expect(wrapper.hasClass(styles.container)).toBeTruthy()
    expect(wrapper.hasClass(styles.minimized)).toBeTruthy()
  })

})
