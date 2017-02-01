import * as React from 'react'
import { mount } from 'enzyme'

import { RegistrationFields, RAuthRegister } from 'src/models'
import { Register } from './../Register'
import { Input } from 'src/shared/components'
import { handleAuthCredentialChange } from 'src/state/auth/register'
import { containerCrudTestFactory } from 'src/testUtils'

const curry = require('ramda/src/curry')

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
    const dispatch = jasmine.createSpy('dispatch')
    const wrapper = mount(<Register dispatch={dispatch} />)
    const testFactory = containerCrudTestFactory(wrapper, dispatch, fields, handleAuthCredentialChange)

    // Run through each of the fields to test
    Object.keys(fields).forEach(testFactory)
  })

})
