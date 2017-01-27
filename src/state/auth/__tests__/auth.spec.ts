import { RAuth } from 'src/models'
import auth, { initialState, requestLogin } from 'src/state/auth'
const state: RAuth = initialState


describe('Auth Actions', () => {

  it('#requestLogin', () => {
    const nextState = auth(undefined, requestLogin('jrf61194@gmail.com', 'Passw0rd1'))
    const { fetchingLogin, errorMessage, loginSuccesfull} = nextState
    expect(fetchingLogin).toBeTruthy()
    expect(errorMessage).toBeNull()
    expect(loginSuccesfull).toBeNull()
  })

})
