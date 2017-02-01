import {
  Validator,
  ValidatorResponseObject
} from 'src/models'

export function validatorFactory<T>(validator: Validator<T>): (obj: T) => ValidatorResponseObject<T> {
  return (obj): any => {
    const errorMessage = Object.keys(validator).reduce((err, key) => {
      const { invalid } = validator[<any> key]
      const value = obj[key]

      const messages = invalid(value)

      if (messages !== null) {
        return Object.assign({}, err, {
          [key]: messages
        })
      }

      return err
    }, {})

    return Object.keys(errorMessage).length === 0 ? null : errorMessage
  }
}
