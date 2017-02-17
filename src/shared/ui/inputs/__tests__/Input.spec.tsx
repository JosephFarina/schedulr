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

    // it('if value is "" and focused label should be active', () => {
    //   const value = ""
    //   wrapper = mount(<Input value={value} onChange={null} />)
    //   wrapper.setState({ focused: true })
    //   expect(wrapper.html()).toContain(styles.labelActive)
    // })

    it('if value is not empty and is blurred label should be active', () => {
      const value = "hell"
      wrapper = mount(<Input value={value} onChange={null} />)
      wrapper.setState({ focused: false })
      expect(wrapper.html()).toContain(styles.labelActive)
    })

  })

  // it('should store state as touched after first time focused and stay touched', () => {
  //   expect(wrapper.state().touched).toBeFalsy()

  //   findInputFromInputComp(wrapper, 'test').simulate('focus', {})
  //   expect(wrapper.state().touched).toBeTruthy()

  //   findInputFromInputComp(wrapper, 'test').simulate('blur', {})
  //   expect(wrapper.state().touched).toBeTruthy()

  //   findInputFromInputComp(wrapper, 'test').simulate('focus', {})
  //   expect(wrapper.state().touched).toBeTruthy()
  // })

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

    function setWrapperValue(val: string) {
      const validateObj = validatorFactory(validatorConfig)({ someName: val })
      return mount(<Input name={name} validateObj={validateObj} value={''} onChange={() => { }} />)
    }

    beforeEach(() => {
      wrapper = setWrapperValue('im some value')
    })

    /**
     * TODO: Rewrite these tests to test the HOC inputValidatorWrapper
     * 
     */

    // it('if there is an error but it has not not been touched yet it should not have the invalid class or valid class', () => {
    //   expect(wrapper.find(`.${styles.invalid}`).length).toEqual(0)
    //   expect(wrapper.find(`.${styles.valid}`).length).toEqual(0)
    // })

    // it('if there is no error and it has been touched it should have the valid class', () => {
    //   wrapper = setWrapperValue('')
    //   findInputFromInputComp(wrapper, name).simulate('focus', {})
    //   expect(wrapper.find(`.${styles.valid}`).length).toEqual(1)
    // })

    // it('if there is an error and it has been touched it should have the invalid class but no message', () => {
    //   findInputFromInputComp(wrapper, name).simulate('focus', {})
    //   expect(wrapper.find(`.${styles.invalid}`).length).toEqual(1)
    //   expect(wrapper.find(`.${styles.message}`).text()).toEqual('')
    // })

    // it('if there is an error and it has been touched and displayErrors is true than there error message should be shown', () => {
    //   wrapper.setProps({ displayErrors: true })
    //   findInputFromInputComp(wrapper, name).simulate('focus', {})
    //   expect(wrapper.find(`.${styles.invalid}`).length).toEqual(1)
    //   expect(wrapper.find(`.${styles.message}`).text()).toEqual(expectedMessageText)
    //   expect(wrapper.find(`.${styles.containerWithMessage}`).length).toEqual(1)
      
    // })

    // it('if displayErrors then have invalid class regardless if has been focused or not', () => {
    //   wrapper.setProps({ displayErrors: true })
    //   expect(wrapper.find(`.${styles.invalid}`).length).toEqual(1)
    // })

  })

})
