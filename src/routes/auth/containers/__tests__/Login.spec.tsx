import * as React from 'react'
import { mount } from 'enzyme'
import { Login } from './../Login'
import { Input } from 'src/shared/components'
import { handleAuthCredentialChange } from 'src/state/auth/login'
import { findInputFromInputComp } from 'src/testUtils'

describe('Login Container', () => {

  it('sanity test', () => {
    const wrapper = mount(<Login />)
    expect(wrapper).toBeTruthy()
  })

  describe('Test input dispatching event to sync state with store on change end', () => {
    let dispatch
    let wrapper = mount(<Login dispatch={dispatch} />)
    const email = 'jrf71194@gmaol.com'
    const password = 'passwordasd'

    beforeEach(() => {
      dispatch = jasmine.createSpy('dispatch')
      wrapper = mount(<Login dispatch={dispatch} />)
    })

    it('email change', done => {
      wrapper.setState({ password: '' })
      const emailInput = findInputFromInputComp(wrapper, 'email')
      emailInput.simulate('change', { target: { value: email } })

      // Need to wait for the inputs debounce after simulating change event
      setTimeout(() => {
        const expectedAction = handleAuthCredentialChange(email, '')
        expect(dispatch.calls.mostRecent().args).toEqual([expectedAction])
        done()
      }, 500)
    })

    it('password change', done => {
      wrapper.setState({ email: '' })
      const passwordInput = findInputFromInputComp(wrapper, 'password')
      passwordInput.simulate('change', { target: { value: password } })

      // Need to wait for the inputs debounce after simulating change event
      setTimeout(() => {
        const expectedAction = handleAuthCredentialChange('', password)
        expect(dispatch.calls.mostRecent().args).toEqual([expectedAction])
        done()
      }, 500)
    })

  })


})

