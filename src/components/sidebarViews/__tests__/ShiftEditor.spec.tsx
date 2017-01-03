import {
  mount
} from 'enzyme'
import * as React from 'react'

import ShiftEditor from './../ShiftEditor'

import ButtonGroup from './../../buttons/ButtonGroup'

describe('ShiftEditor', () => {
  let wrapper = mount(<ShiftEditor />)
  beforeEach(() => {
    wrapper = mount(<ShiftEditor />)
  })

  it('should render', () => {
    mount(<ShiftEditor />)
  })

  describe('toggle modes', () => {

    it('if there is a selected shift there should be a button group with edit and new options', () => {
      wrapper = mount(<ShiftEditor shiftSelected={true} />)
      const text = getTextInButtonGroup(wrapper)

      expect(text).toContain('New')
      expect(text).toContain('Edited')
    })

    it('if there is no selected shift there should be no option for edit or new', () => {
      wrapper = mount(<ShiftEditor />)
      const text = getTextInButtonGroup(wrapper)

      expect(text).toBeFalsy()
    })

  })

})


function getTextInButtonGroup(wrapper: any): string[] {
  const btnGroup = wrapper.find(ButtonGroup)
  const text = btnGroup.children().map((child: any) => {
    return child.text()
  })

  return text.length > 0 ? text : null
}
