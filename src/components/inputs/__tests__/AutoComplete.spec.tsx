import {
  ReactWrapper,
  mount
} from 'enzyme'
import * as React from 'react'

import AutoComplete from './../AutoComplete'
const styles = require('./../AutoComplete.css')

const results: string[] = 'one two three four'.split(' ')

describe('AutoComplete', () => {
  let wrapper: ReactWrapper<any, {}>

  beforeEach(() => {
    wrapper = mount(<AutoComplete value={"null"} results={results} onChange={null} />)
  })

  it('on focus the results should be shown', () => {
    getInputEl().simulate('focus')
    const items = getDropdownItems()
    expect(items.length).toBe(results.length)
  })

  it('on blur the results should be hidden', () => {
    getInputEl().simulate('blur')
    const items = getDropdownItems()
    expect(items.length).toBe(0)
  })

  describe('test onChanges', () => {
    let mockOnChange: jasmine.Spy

    beforeEach(() => {
      mockOnChange = jasmine.createSpy('mockOnChange')
      wrapper = mount(<AutoComplete value={'234'} onChange={mockOnChange} />)
      getInputEl().simulate('focus')
    })

    it('it should otput the value onchange', () => {
      const val = 'this should be it!'
      getInputEl().simulate('change', { target: { value: val } })
      expect(getMostRecentCall(mockOnChange)).toEqual(val)
    })

    it('should call onChanges with the value of the selectedindex when enter is pressed', () => {
      const selectedIndex = 1
      wrapper.setState({ selectedIndex, focused: true })
      wrapper.simulate('keydown', { which: 13 })
      expect(getMostRecentCall(mockOnChange)).toEqual(results[selectedIndex])
    })

    it('should call onChanges with the value of the selectedindex when moused over', () => {
      getDropdownItems().forEach(item => {
        item.simulate('mouseover')
        expect(getMostRecentCall(mockOnChange)).toEqual(results[+item.key()])
      })
    })

  })

  function getInputEl() {
    return wrapper.find('input')
  }

  function getDropdownItems() {
    return wrapper.findWhere(w => w.hasClass(styles.item))
  }

  function getMostRecentCall(spy: jasmine.Spy): string {
    return spy.calls.mostRecent().args[0]
  }

})

