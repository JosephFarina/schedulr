import { RAuthRegister } from 'src/models'
import { RegisterActions } from 'src/state/actionTypes'
export const initialState: RAuthRegister = {
  email: '',
  orgName: '',
  confirmPassword: '',
  password: '',
  errors: null,
  fetching: false
}

const register = (state = initialState, action) => {
  const { payload } = action

  switch (action.type) {

    case RegisterActions.updateRegistrationField:
      return Object.assign({}, state, payload)

    case RegisterActions.requestInitiated:
      return Object.assign({}, state, payload)

    case RegisterActions.loginRejected:
      return Object.assign({}, state, payload)

    case RegisterActions.loginSucceeded:
      return initialState

    default:
      return state
  }
}

export default register
