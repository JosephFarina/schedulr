import { RState, RAuthRegister } from 'src/models'
import { authRegisterValidator, getAuthRegister } from './../'

describe('Auth Register Validator', () => {

  it('account name must exist', () => {
    const register: RAuthRegister = {
      orgName: ''
    }
    const errors = authRegisterValidator(getState(register))(register)
    expect(errors.orgName).toContain('There must be an organization name.')
  })

  describe('password should throw error if:', () => {

    it('isnt 8 charactars long', () => {
      const register: RAuthRegister = {
        password: 'three'
      }
      const errors = authRegisterValidator(getState(register))(register)
      expect(errors.password).toContain('Password must be at least 8 characters long.')
    })

    it('doesnt have one uppercase letter', () => {
      const register: RAuthRegister = {
        password: 'threee'
      }
      const errors = authRegisterValidator(getState(register))(register)
      expect(errors.password).toContain('Password must contain at least one uppercase letter.')
    })

    it('doesnt have one letter', () => {
      const register: RAuthRegister = {
        password: 'threee'
      }
      const errors = authRegisterValidator(getState(register))(register)
      expect(errors.password).toContain('Password must contain at least one number letter.')
    })

  })

  it('confirmPassword: should throw error if password and confirm password is not the same', () => {
    const register: RAuthRegister = {
      confirmPassword: 'Passw0rd1',
      password: 'Passw0rd'
    }

    const errors = authRegisterValidator(getState(register))(register)
    expect(errors.confirmPassword).toContain('Passwords do not match.')
  })

})

function getState(register: RAuthRegister): RState {
  return {
    auth: {
      register
    }
  }
}
