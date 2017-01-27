import { AuthActions } from './../actionTypes'
import { Action, RAuth } from 'src/models'

const requestLoginAction = (email: string, password: string): Action<RAuth> => ({
  type: AuthActions.requestLogin,
  payload: {
    email,
    password,
    fetchingLogin: true
  }
})

export const requestLogin = (email: string, password: string): Action<RAuth> => {
  return requestLoginAction(email, password)
}
