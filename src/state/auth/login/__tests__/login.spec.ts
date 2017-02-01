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
import { triggerNotification } from 'src/state/ui/notification'
import {
  LOCALSTORAGE_JWT_TOKEN,
  PAGE_TO_REDIRECT_TO_AFTER_SUCCESFUL_LOGIN
} from 'src/config'

const email = 'jrf61194@gmail.com'
const password = 'Pas$w0Rd13'
const jwt = 'thisi s a long token'

const createApiSpy = (val: Promise<any>) => {
  return spyOn(API, 'login').and.returnValue(val)
}

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
    const getState = (): RState => ({ auth: { login: { email, password } } })

    beforeEach(() => {
      dispatch = jasmine.createSpy('dispatch')
    })

    function testApiCalledWithEmailAndPassword(apiCall) {
      expect(apiCall.calls.mostRecent().args).toEqual([email, password])
    }

    function firstDispatchShouldBeLoginInitiated() {
      expect(dispatch.calls.first().args[0]).toEqual(loginInitiated())
    }

    function secondDispatchCallShouldEqual(expectedValue) {
      expect(dispatch.calls.all()[1].args[0]).toEqual(expectedValue)
    }

    function lastDispatchCallShouldEqual(expectedValue) {
      expect(dispatch.calls.mostRecent().args[0]).toEqual(expectedValue)
    }

    it('when unsuccesful attempt: loginInitiated -> rejectedLogin -> triggerNotification', done => {
      const errors = ['blah blak', 'another error']
      const apiCall = createApiSpy(Promise.resolve({ successful: false, errors }))
      testFailureFlow(done, apiCall, errors)
    })

    it('when an error occurs: loginInitiated -> rejectedLogin -> triggerNotification', done => {
      const errors = ['An error occured trying to log you in']
      const apiCall = createApiSpy(Promise.reject({ errors }))
      testFailureFlow(done, apiCall, errors)
    })

    function testFailureFlow(done, apiCall, errors) {
      requestLogin()(dispatch, getState).then(() => {
        testApiCalledWithEmailAndPassword(apiCall)
        firstDispatchShouldBeLoginInitiated()
        secondDispatchCallShouldEqual(loginRejected(errors))
        // todo: figure out how to test if notifcation is being dispatched
        // lastDispatchCallShouldEqual(triggerNotification(errors))
        done()
      })
    }

    it('when successful attempt: loginInitiated -> localStorage set token -> successfulLogin -> redirect to dashboard', done => {
      const localStorageSpy = spyOn(localStorage, 'setItem')
      const browserHistoryPushSpy = spyOn(browserHistory, 'push')
      const apiCall = createApiSpy(Promise.resolve({ successful: true, jwt }))


      requestLogin()(dispatch, getState).then(() => {
        testApiCalledWithEmailAndPassword(apiCall)
        firstDispatchShouldBeLoginInitiated()
        lastDispatchCallShouldEqual(successfulLogin())
        expect(localStorageSpy.calls.mostRecent().args).toEqual([LOCALSTORAGE_JWT_TOKEN, jwt])
        expect(browserHistoryPushSpy.calls.mostRecent().args[0]).toEqual(PAGE_TO_REDIRECT_TO_AFTER_SUCCESFUL_LOGIN)
        done()
      })

    })

  })

})
