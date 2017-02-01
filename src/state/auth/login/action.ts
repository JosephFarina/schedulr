/**
 * TODO: Show error message if error occurs
 */

import { browserHistory } from 'react-router'

import { LoginActions } from 'src/state/actionTypes'
import { Action, RAuthLogin } from 'src/models'
import { getAuthLogin } from './'
import {
  LOCALSTORAGE_JWT_TOKEN,
  PAGE_TO_REDIRECT_TO_AFTER_SUCCESFUL_LOGIN
} from 'src/config'
import * as API from 'src/api'
import { triggerNotification } from 'src/state/ui/notification'

/**
 * 
 * Handle Auth Credential Changes
 * 
 */


export const handleAuthCredentialChange = ({email, password}): Action<RAuthLogin> => {
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




export const requestLogin = () => (dispatch, getState): Promise<any> => {
  const { email, password } = getAuthLogin(getState())

  dispatch(loginInitiated())

  return API.login(email, password)
    .then(({ errors, successful, jwt }) => {
      if (!successful) {
        dispatch(loginRejected(errors))
        dispatch(triggerNotification(errors))
      } else {
        localStorage.setItem(LOCALSTORAGE_JWT_TOKEN, jwt)
        dispatch(successfulLogin())
        browserHistory.push(PAGE_TO_REDIRECT_TO_AFTER_SUCCESFUL_LOGIN)
      }
    })
    .catch(({errors}) => {
      dispatch(loginRejected(errors))
      dispatch(triggerNotification(errors))
    })

}
