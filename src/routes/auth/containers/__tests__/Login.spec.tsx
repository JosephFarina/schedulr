import * as React from 'react'
import { mount } from 'enzyme'
import { Login } from './../Login'
import { handleAuthCredentialChange } from 'src/state/auth/login'
import { containerCrudTestFactory } from 'src/testUtils'

describe('Login Container', () => {

  it('sanity test', () => {
    const wrapper = mount(<Login />)
    expect(wrapper).toBeTruthy()
  })

  // describe('Test input dispatching event to sync state with store on change end', () => {
  //   const fields = {
  //     email: 'Jrf61194@gmail.com',
  //     password: 'Passw0rd1',
  //   }
  //   const dispatch = jasmine.createSpy('dispatch')
  //   const wrapper = mount(<Login dispatch={dispatch} />)
  //   const testFactory = containerCrudTestFactory(wrapper, dispatch, fields, handleAuthCredentialChange)

  //   // Run through each of the fields to test
  //   Object.keys(fields).forEach(testFactory)
  // })


})

