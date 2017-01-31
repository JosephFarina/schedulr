import { RAuthRegister } from 'src/models'
import { LoginActions } from 'src/state/actionTypes'
export const initialState: RAuthRegister = {}

const register = (state = initialState, action) => {
  const {payload} = action

  switch (action.type) {

    default:
      return state
  }
}

export default register
