import { LoginActions } from 'src/state/actionTypes'
import { Action, RAuthLogin } from 'src/models'


/**
 * 
 * Handle Auth Credential Changes
 * 
 */


export const handleAuthCredentialChange = (email: string, password: string): Action<RAuthLogin> => {
  return {
    type: LoginActions.updateCredentials,
    payload: {
      email,
      password
    }
  }
}


/**
 * 
 * Initiate Login
 * 
 */

export const loginInitiated = (): Action<RAuthLogin> => {
  return {
    type: LoginActions.requestInitiated,
    payload: {
      fetching: true
    }
  }
}

/**
 * 
 * Reject Login
 * 
 */

export const loginRejected = (errors: string[] = []): Action<RAuthLogin> => {
  return {
    type: LoginActions.loginRejected,
    payload: {
      errors,
      fetching: false
    }
  }
}

/**
 * 
 * Successful Login
 * 
 */

export const successfulLogin = (): Action<RAuthLogin> => ({ type: LoginActions.loginSucceeded, payload: null })




/**
 * 
 * Request Login
 * 
 * Thunk function 
 * 
 * Checks there is password/email and dispatches a message if missing
 * calls api to login
 * if error 
 *  displays message
 * 
 * else 
 *  sets token into local storage
 *  redirects
 * 
 * 
 * 
 */


export const requestLogin = () => (dispatch, getState) => {
  return new Promise((res, rej) => {
    dispatch(loginInitiated())


  })
}
