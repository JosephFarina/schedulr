import { RAuthLogin } from 'src/models'
import { LoginActions } from 'src/state/actionTypes'
export const initialState: RAuthLogin = {
  email: null,
  password: null,
  errors: null,
  fetching: false
}

const login = (state = initialState, action) => {
  const {payload} = action
  switch (action.type) {

    case LoginActions.updateCredentials:
      return Object.assign({}, state, payload)

    case LoginActions.requestInitiated:
      return Object.assign({}, state, payload)

    case LoginActions.loginRejected:
      return Object.assign({}, state, payload)

    case LoginActions.loginSucceeded:
      return initialState

    default:
      return state
  }
}

export default login
