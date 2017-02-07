import * as React from 'react'
import { mount } from 'enzyme'

import { Register } from './../Register'
import { handleRegistrationCredentialChange } from 'src/state/auth/register'
import { containerCrudTestFactory } from 'src/testUtils'

describe('Register Container', () => {

  it('sanity test', () => {
    const wrapper = mount(<Register />)
    expect(wrapper).toBeTruthy()
  })

  describe('Test input dispatching event to sync state with store on change end', () => {
    const fields = {
      orgName: 'Some Orgs Name',
      email: 'Jrf61194@gmail.com',
      password: 'Passw0rd1',
      confirmPassword: 'Passw0rd1',
    }
    let dispatch = jasmine.createSpy('dispatch')
    let wrapper = mount(<Register dispatch={dispatch} />)
    const testFactory = containerCrudTestFactory(wrapper, dispatch, fields, handleRegistrationCredentialChange)

    beforeEach(() => {
      wrapper = mount(<Register dispatch={dispatch} />)
      dispatch = jasmine.createSpy('dispatch')
    })

    // Run through each of the fields to test
    Object.keys(fields).forEach(testFactory)
  })

})
