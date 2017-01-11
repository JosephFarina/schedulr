import {
  Validator,
  ValidatorResponseObject
} from 'src/models'

export function validatorFactory<T>(validator: Validator<T>): (obj: T) => ValidatorResponseObject<T> {
  return (obj): any => {
    const errorMessage = Object.keys(validator).reduce((err, key) => {
      const { message, isValid } = validator[<any>key]
      const value = obj[key]

      if (!isValid(value)) {
        return Object.assign({}, err, {
          [key]: [message]
        })
      }

      return err
    }, {})

    return Object.keys(errorMessage).length === 0 ? null : errorMessage
  }
}
