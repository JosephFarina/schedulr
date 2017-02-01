import { RAuthRegister, RState } from 'src/models'

export const getAuthRegister = (state: RState): RAuthRegister => state.auth.register
