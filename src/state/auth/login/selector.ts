import { RState, RAuthLogin } from 'src/models'

export const getAuthLogin = (state: RState): RAuthLogin => state.auth.login
