import {
  mount,
  ReactWrapper
} from 'enzyme'
import * as React from 'react'

import { Validator, ValidatorResponseObject } from 'src/models'
import { validatorFactory } from 'src/utils'
import { findInputFromInputComp } from 'src/testUtils'

import Input, { Props, State } from './../Input'


const styles = require('./../Input.scss')

describe('Input', () => {
  let wrapper: ReactWrapper<any, any> = mount(<Input name="test" value={null} onChange={null} />)

  beforeEach(() => {
    wrapper = mount(<Input name="test" value={null} onChange={null} />)
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

  it('should store state as touched after first time focused and stay touched', () => {
    expect(wrapper.state().touched).toBeFalsy()

    findInputFromInputComp(wrapper, 'test').simulate('focus', {})
    expect(wrapper.state().touched).toBeTruthy()

    findInputFromInputComp(wrapper, 'test').simulate('blur', {})
    expect(wrapper.state().touched).toBeTruthy()

    findInputFromInputComp(wrapper, 'test').simulate('focus', {})
    expect(wrapper.state().touched).toBeTruthy()
  })

  describe('validation:', () => {
    const name = 'someName'
    const validatorConfig: Validator<{ someName: string }> = {
      someName: {
        invalid(val) {
          return val.length > 0 ? ['it is'] : null
        }
      }
    }
    const inputValue = { someName: 'hello im a value' }
    const validateObj = validatorFactory(validatorConfig)(inputValue)

    it('validationObj && name is undefined in the supplied validation object && !displayErrors', () => {
      wrapper = mount(<Input name={name} validateObj={validateObj} value={null} onChange={null} />)
      const expectedInvalidComponent = mount(<Input name={name} validateObj={validateObj} valid={false} value={null} onChange={null} />)
      // expect(wrapper.html()).toEqual(expectedInvalidComponent.html())
      // expect wrapper to display invalid class  
      // expect wrapper to NOT display error message
    })

  })

})
