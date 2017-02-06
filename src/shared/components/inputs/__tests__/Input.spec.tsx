import {
  mount,
  ReactWrapper
} from 'enzyme'
import * as React from 'react'

import { Validator, ValidatorResponseObject } from 'src/models'
import { validatorFactory, errorArrayToString } from 'src/utils'
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
    wrapper = mount(<Input value={val} onChange={() => { }} />)
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
    const message = ['it is', 'another error', 'onemore err']
    const expectedMessageText = errorArrayToString(message)
    const validatorConfig: Validator<{ someName: string }> = {
      someName: {
        invalid(val) {
          return val.length > 0 ? message : null
        }
      }
    }
    const inputValue = { someName: 'hello im a value' }
    const validateObj = validatorFactory(validatorConfig)(inputValue)

    beforeEach(() => {
      wrapper = mount(<Input name={name} validateObj={validateObj} value={'length longer than zero'} onChange={() => { }} />)
    })

    it('if there is an error but it has not not been touched yet it should not have the invalid class', () => {
      expect(wrapper.find(`.${styles.invalid}`).length).toEqual(0)
    })

    it('if there is an error and it has been touched it should have the invalid class but no message', () => {
      findInputFromInputComp(wrapper, name).simulate('focus', {})
      expect(wrapper.find(`.${styles.invalid}`).length).toEqual(1)
      expect(wrapper.find(`.${styles.message}`).text()).toEqual('')
    })

    it('if there is an error and it has been touched and displayErrors is true than there error message should be shown', () => {
      wrapper.setProps({ displayErrors: true })
      findInputFromInputComp(wrapper, name).simulate('focus', {})
      expect(wrapper.find(`.${styles.invalid}`).length).toEqual(1)
      expect(wrapper.find(`.${styles.message}`).text()).toEqual(expectedMessageText)
      expect(wrapper.find(`.${styles.containerWithMessage}`).length).toEqual(1)
      console.log(wrapper.debug())
    })

  })

})
