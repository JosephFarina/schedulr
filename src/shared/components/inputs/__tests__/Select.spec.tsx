import {
  ReactWrapper,
  mount,
} from 'enzyme'
import * as React from 'react'

import Select from './../Select'

const selectStyles = require('./../Select.scss')

const items: { display: string, value: string }[] = [
  {
    display: 'Number One',
    value: '1'
  },
  {
    display: 'Number Two',
    value: '2'
  }
]

describe('Select', () => {
  let wrapper: ReactWrapper<any, any>

  beforeEach(() => {
    wrapper = mount(<Select value={''} onChange={null} options={items} />)
  })

  it('should display each item when clicked', () => {
    wrapper.simulate('click')
    expect(getOptions().length).toEqual(items.length)
  })

  it('should hide all items when mouseleave', () => {
    wrapper.simulate('click')
    expect(getOptions().length).toEqual(items.length)
    wrapper.simulate('mouseleave')
    expect(getOptions().length).toEqual(0)
  })

  it('when item is clicked it should call on change with item and hide the items', () => {
    const mockOnChange = jasmine.createSpy('mockOnChange')
    wrapper = mount(<Select value={''} onChange={mockOnChange} options={items} />)
    wrapper.simulate('click')
    getOptions().first().simulate('click')
    expect(mockOnChange.calls.mostRecent().args[0]).toEqual(items[0].value)
  })

  it('expect value to be displayed', () => {
    const value = 'This should be shown!'
    wrapper = mount(<Select value={value} onChange={null} options={items} />)
    expect(wrapper.html()).toContain(value)
  })

  function getOptions() {
    return wrapper.find(`.${selectStyles.item}`)
  }

})

