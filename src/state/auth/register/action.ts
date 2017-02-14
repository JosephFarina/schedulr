import { browserHistory } from 'react-router'

import { RegisterActions } from 'src/state/actionTypes'
import { Action, RAuthRegister } from 'src/models'
import { getAuthRegister } from './'
import { triggerNotification } from './../../ui/notification'
import * as API from 'src/api'
import { LOCALSTORAGE_JWT_TOKEN, PAGE_TO_REDIRECT_TO_AFTER_SUCCESFUL_REGISTRATION } from 'src/config'


/**
 * 
 * Handle Auth Credential Changes
 * 
 */


export const handleRegistrationCredentialChange = (property, val) => (dispatch, getState) => {
  dispatch({
    type: RegisterActions.updateRegistrationField,
    payload: Object.assign({}, getAuthRegister(getState()), { [property]: val })
  })
}


export const successfulRegistration = (): Action<RAuthRegister> => ({ type: RegisterActions.succesfull, payload: null })

export const rejectedRegistration = (errors: string[]): Action<RAuthRegister> => ({
  type: RegisterActions.loginRejected,
  payload: {
    fetching: false,
    errors
  }
})

export const registerInitiated = (): Action<RAuthRegister> => {
  return {
    type: RegisterActions.requestInitiated,
    payload: {
      fetching: true
    }
  }
}

export const requestRegistration = () => (dispatch, getState) => {
  const {email, password, confirmPassword, orgName} = getAuthRegister(getState())
  dispatch(registerInitiated())
  return API.register({ email, password, confirmPassword, orgName })
    .then(({errors, jwt, successful}) => {
      if (!successful) {
        dispatch(rejectedRegistration(errors))
        dispatch(triggerNotification(errors))
      } else {
        localStorage.setItem(LOCALSTORAGE_JWT_TOKEN, jwt)
        dispatch(successfulRegistration())
        browserHistory.push(PAGE_TO_REDIRECT_TO_AFTER_SUCCESFUL_REGISTRATION)
      }
    })
    .catch(({errors}) => {
      dispatch(rejectedRegistration(errors))
      dispatch(triggerNotification(errors))
    })
}
