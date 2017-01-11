import {
  validatorFactory
} from 'src/utils'

import {
  Validator,
  ValidatorResponseObject
} from 'src/models'

interface Object {
  name: string
  duration: number
  values: string[]
}

const validateObj: Validator<Object> = {
  name: {
    message: 'Name must be greater than 5 charectars',
    isValid: (val) => {
      return val.length > 5
    }
  },
  duration: {
    message: 'Duration must be between 5 and 10',
    isValid: (val) => {
      return val >= 5 && val <= 10
    }
  },
  values: {
    message: 'There must be three values',
    isValid: (val) => {
      return val.length === 3
    }
  }
}

let obj: Object

const objValidator = validatorFactory<Object>(validateObj)

describe('validatorFactory', () => {
  beforeEach(() => {
    obj = {
      name: 'Joseph',
      duration: 6,
      values: ['one', 'two', 'three']
    }
  })

  it('should return null if all correct', () => {
    expect(objValidator(obj)).toBeNull()
  })

  it('should return an an object with the key and the key should be an array of messages', () => {
    obj.name = '3ch'
    const expectedValue: ValidatorResponseObject<Object> = {
      name: [validateObj.name.message]
    }

    expect(objValidator(obj)).toEqual(expectedValue)
  })

  it('should be able to handle multiple errors', () => {
    obj.duration = 0
    obj.values = ['oe', 'two']
    const expectedValue: ValidatorResponseObject<Object> = {
      duration: [validateObj.duration.message],
      values: [validateObj.values.message],
    }
    expect(objValidator(obj)).toEqual(expectedValue)
  })

})
