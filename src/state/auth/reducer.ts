import { RAuth } from 'src/models'
import { AuthActions } from 'src/state/actionTypes'
export const initialState: RAuth = {
  email: null,
  password: null,
  errorMessage: null,
  loginSuccesfull: null,
  fetchingLogin: false
}

const auth = (state = initialState, action) => {
  switch (action.type) {

    case AuthActions.requestLogin:
      return Object.assign({}, state, action.payload)

    default:
      return state
  }
}

export default auth
