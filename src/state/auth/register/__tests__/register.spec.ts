import { browserHistory } from 'react-router'

import { RAuthRegister, RState } from 'src/models'
import { triggerNotification } from 'src/state/ui/notification'
import { LOCALSTORAGE_JWT_TOKEN, PAGE_TO_REDIRECT_TO_AFTER_SUCCESFUL_REGISTRATION } from 'src/config'
import * as API from 'src/api'

import register, {
  registerInitiated,
  initialState,
  rejectedRegistration,
  handleRegistrationCredentialChange,
  successfulRegistration,
  requestRegistration
} from './../'

import {
  testSpyFlow,
  createApiSpy,
  lastSpyCall
} from 'src/testUtils'

const registrationFields = {
  orgName: 'Im some org',
  email: 'jrf61194@gmail.com',
  password: 'Pas$w0Rd13',
  confirmPassword: 'Pas$w0Rd13'
}
const jwt = 'somevalidjwttoken'
const apiRegisterSpy = createApiSpy(API, 'register')

describe('Auth — Registration', () => {
  beforeEach(() => { jasmine.DEFAULT_TIMEOUT_INTERVAL = 150000 })

  it('#initated() should set fetching to true', () => {
    const state = register(undefined, registerInitiated())
    expect(state.fetching).toBeTruthy()
  })

  it('#succesful should return the default state', () => {
    const state = register(undefined, successfulRegistration())
    expect(state).toEqual(initialState)
  })

  it('#error should add errors to the state', () => {
    const errors = ['some error here', 'another error here']
    const state = register(undefined, rejectedRegistration(errors))
    expect(state.errors).toEqual(errors)
    expect(state.fetching).toEqual(false)
  })

  describe('registration flow', () => {
    let dispatch
    let localStorageSpy
    let browserHistoryPushSpy
    beforeEach(() => {
      dispatch = jasmine.createSpy('dispatch')
      localStorageSpy = spyOn(localStorage, 'setItem')
      browserHistoryPushSpy = spyOn(browserHistory, 'push')
    })

    const getState = (): RState => ({ auth: { register: registrationFields } })
    const errors = ['blah blak', 'another error']


    /**
     * 
     * Test Failure Flows
     * 
     */

    it('when unsuccesful attempt: loginInitiated() -> rejectedLogin() -> triggerNotification()', done => {
      apiRegisterSpy(Promise.resolve({ successful: false, errors }))
      testFailureFlow(done)
    })

    it('when there is an error: loginInitiated() -> rejectedLogin() -> triggerNotification()', done => {
      apiRegisterSpy(Promise.reject({ errors }))
      testFailureFlow(done)
    })

    function testFailureFlow(done) {
      requestRegistration()(dispatch, getState).then(() => {

        testSpyFlow(dispatch, [
          registerInitiated(),
          rejectedRegistration(errors)
        ])

        done()
      })
    }

    it('when successfull: loginInitiated() -> successfulRegistration()', done => {
      apiRegisterSpy(Promise.resolve({ jwt, successful: true }))

      requestRegistration()(dispatch, getState).then(() => {

        testSpyFlow(dispatch, [
          registerInitiated(),
          successfulRegistration()
        ])

        expect(lastSpyCall(localStorageSpy)).toEqual([LOCALSTORAGE_JWT_TOKEN, jwt])
        expect(lastSpyCall(browserHistoryPushSpy)).toEqual([PAGE_TO_REDIRECT_TO_AFTER_SUCCESFUL_REGISTRATION])

        done()
      })
    })
  })

})
