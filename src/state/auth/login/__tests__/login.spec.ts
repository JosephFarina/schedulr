import { browserHistory } from 'react-router'

import { RAuthLogin, RState } from 'src/models'
import * as API from 'src/api'

import auth, {
  loginInitiated,
  loginRejected,
  successfulLogin,
  handleAuthCredentialChange,
  initialState,
  requestLogin,
} from './..'

import {
  LOCALSTORAGE_JWT_TOKEN,
  PAGE_TO_REDIRECT_TO_AFTER_SUCCESFUL_LOGIN
} from 'src/config'

import {
  lastSpyCall,
  createApiSpy,
  testSpyFlow
} from 'src/testUtils'

const email = 'jrf61194@gmail.com'
const password = 'Pas$w0Rd13'
const jwt = 'thisi s a long token'

const apiLoginSpy = createApiSpy(API, 'login')

describe('Auth — Login', () => {
  beforeEach(() => { jasmine.DEFAULT_TIMEOUT_INTERVAL = 150000 })

  it('#handleAuthCredentialChange should update the state', () => {
    const nextState: RAuthLogin = auth(undefined, handleAuthCredentialChange({ email, password }))
    expect(nextState.email).toEqual(email)
    expect(nextState.password).toEqual(password)
  })

  it('#loginInitiated should set fetching to true', () => {
    const nextState: RAuthLogin = auth(undefined, loginInitiated())
    expect(nextState.fetching).toBe(true)
  })

  it('#rejectedLogin should add the error messages', () => {
    const errors = ['There is no email', 'Password is wrong']
    const nextState: RAuthLogin = auth(undefined, loginRejected(errors))
    expect(nextState.fetching).toBe(false)
    expect(nextState.errors).toEqual(errors)
  })

  it('#successfulLogin should return default state', () => {
    const nextState: RAuthLogin = auth({}, successfulLogin())
    expect(nextState).toEqual(initialState)
  })

  describe('#requestLogin login flow', () => {
    let dispatch
    beforeEach(() => { dispatch = jasmine.createSpy('dispatch') })
    const getState = (): RState => ({ auth: { login: { email, password } } })
    const errors = ['blah blak', 'another error']

    /**
     * 
     * Test Failure Flows
     * 
     */

    it('when unsuccesful attempt: loginInitiated() -> rejectedLogin() -> triggerNotification()', done => {
      apiLoginSpy(Promise.resolve({ successful: false, errors }))
      testFailureFlow(done)
    })

    it('when an error occurs: loginInitiated() -> rejectedLogin() -> triggerNotification()', done => {
      apiLoginSpy(Promise.reject({ errors }))
      testFailureFlow(done)
    })

    function testFailureFlow(done) {
      requestLogin()(dispatch, getState).then(() => {

        testSpyFlow(dispatch, [
          loginInitiated(),
          loginRejected(errors),
        ])

        done()
      })
    }

    /**
     * 
     * Successful Test
     * 
     */

    it('when successful: loginInitiated() -> localStorage.setToken(jwt) -> successfulLogin() -> redirect to dashboard', done => {
      const localStorageSpy = spyOn(localStorage, 'setItem')
      const browserHistoryPushSpy = spyOn(browserHistory, 'push')
      apiLoginSpy(Promise.resolve({ successful: true, jwt }))

      requestLogin()(dispatch, getState).then(() => {

        testSpyFlow(dispatch, [
          loginInitiated(),
          successfulLogin()
        ])

        expect(lastSpyCall(localStorageSpy)).toEqual([LOCALSTORAGE_JWT_TOKEN, jwt])
        expect(lastSpyCall(browserHistoryPushSpy)).toEqual([PAGE_TO_REDIRECT_TO_AFTER_SUCCESFUL_LOGIN])
        done()
      })

    })

  })

})
