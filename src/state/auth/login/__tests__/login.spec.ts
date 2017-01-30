import { RAuthLogin, RState } from 'src/models'
import * as API from 'src/api'
import auth, {
  loginInitiated,
  loginRejected,
  successfulLogin,
  handleAuthCredentialChange,
  initialState,
  requestLogin
} from './..'

const state: RAuthLogin = initialState
const email = 'jrf61194@gmail.com'
const password = 'Pas$w0Rd13'

describe('Auth — Login', () => {

  it('#handleAuthCredentialChange should update the state', () => {
    const nextState: RAuthLogin = auth(undefined, handleAuthCredentialChange(email, password))
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
    const getState = (): RState => ({ auth: { login: initialState } })
    const dispatch = jasmine.createSpy('dispatch')

    it('when unsuccesful attempt: loginInitiated -> rejectedLogin', () => {
      const apiCall = spyOn(API, 'login').and.returnValue(Promise.resolve({
        successful: false
      }))

      requestLogin()(dispatch, getState)

      // test apiCall is called with email and password in the state
      expect(dispatch.calls.first().args[0]).toEqual(loginInitiated())
      // expect next call to equal success
      // expect router to redirect to /dashboard
    })
  })

})
