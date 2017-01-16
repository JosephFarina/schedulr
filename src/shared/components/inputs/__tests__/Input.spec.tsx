import {
  mount
} from 'enzyme'
import * as React from 'react'

import Input from './../Input'

const styles = require('./../Input.css')

describe('Input', () => {
  let wrapper = mount(<Input value={null} onChange={null} />)
  beforeEach(() => {
    wrapper = mount(<Input value={null} onChange={null} />)
  })


  it('should display value prop', () => {
    const val = "helllo"
    wrapper = mount(<Input value={val} onChange={() => { } } />)
    expect(wrapper.html()).toContain(val)
  })

  describe('label', () => {

    it('if value is "" and focused label should be active', () => {
      const value = ""
      wrapper = mount(<Input value={value} onChange={null} />)
      wrapper.setState({ focused: true })
      expect(wrapper.html()).toContain(styles.labelActive)
    })

    it('if value is not empty and is blurred label should be active', () => {
      const value = "hell"
      wrapper = mount(<Input value={value} onChange={null} />)
      wrapper.setState({ focused: false })
      expect(wrapper.html()).toContain(styles.labelActive)
    })

  })

})
