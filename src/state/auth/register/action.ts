/**
 * TODO: Show error message if error occurs
 */

// import { browserHistory } from 'react-router'

import { RegisterActions } from 'src/state/actionTypes'
import { Action, RAuthRegister } from 'src/models'
import {  } from './'
import {
  // LOCALSTORAGE_JWT_TOKEN,
  // PAGE_TO_REDIRECT_TO_AFTER_SUCCESFUL_LOGIN
} from 'src/config'
// import * as API from 'src/api'

/**
 * 
 * Handle Auth Credential Changes
 * 
 */


export const handleAuthCredentialChange = (data: RAuthRegister): Action<RAuthRegister> => {
  return {
    type: RegisterActions.updateRegistrationField,
    payload: Object.assign({}, data)
  }
}


/**
 * 
 * Initiate Registraton
 * 
 */

// export const loginInitiated = (): Action<RAuthLogin> => {
//   return {
//     type: LoginActions.requestInitiated,
//     payload: {
//       fetching: true
//     }
//   }
// }

/**
 * 
 * Reject Registration
 * 
 */

// export const loginRejected = (errors: string[] = []): Action<RAuthLogin> => {
//   return {
//     type: LoginActions.loginRejected,
//     payload: {
//       errors,
//       fetching: false
//     }
//   }
// }

/**
 * 
 * Successful Login
 * 
 */

// export const successfulLogin = (): Action<RAuthLogin> => ({ type: LoginActions.loginSucceeded, payload: null })



export const requestLogin = () => (dispatch, getState): Promise<any> => {
  return
  // const { email, password } = getAuthLogin(getState())

  // dispatch(loginInitiated())

  // return API.login(email, password)
  //   .then(({ errors, successful, jwt }) => {
  //     if (!successful) {
  //       dispatch(loginRejected(errors))
  //     } else {
  //       localStorage.setItem(LOCALSTORAGE_JWT_TOKEN, jwt)
  //       dispatch(successfulLogin())
  //       browserHistory.push(PAGE_TO_REDIRECT_TO_AFTER_SUCCESFUL_LOGIN)
  //     }
  //   })
  //   .catch(({errors}) => {
  //     dispatch(loginRejected(errors))
  //   })

}
