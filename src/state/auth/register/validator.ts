import { getAuthRegister } from './'
import {
  RState,
  RAuthRegister,
  Validator,
  ValidatorResponseObject
} from 'src/models'
import {
  getMoRange,
  validatorFactory,
} from 'src/utils'

// tslint:disable-next-line:max-line-length
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function createValidator(state: RState): Validator<RAuthRegister> {
  const authRegister = getAuthRegister(state)
  const passwordsMatch = authRegister.confirmPassword !== authRegister.password ? ['Passwords do not match.'] : null

  return {
    email: {
      invalid: val => {
        return !emailRegEx.test(val) ? ['Your email must be valid.'] : null
      }
    },
    orgName: {
      invalid: val => {
        return (!val || val.length > 0) ? ['There must be an organization name.'] : null
      }
    },
    password: {
      invalid: val => {
        const errors = []

        if (!val || val.length < 8) {
          errors.push('Password must be at least 8 characters long.')
        }

        if (!/(?=.*?[A-Z])/.test(val)) {
          errors.push('Password must contain at least one uppercase letter.')
        }

        if (!/(?=.*?[0-9])/.test(val)) {
          errors.push('Password must contain at least one number letter.')
        }

        return errors.length > 0 ? errors : null
      }
    },
    confirmPassword: {
      invalid: () => passwordsMatch
    },
  }
}

export const authRegisterValidator = (state: RState) => validatorFactory<RAuthRegister>(createValidator(state))

