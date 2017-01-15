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

const messages = {
  name: 'Name must be greater than 5 charectars',
  duration: 'Duration must be between 5 and 10',
  values: 'There must be three values'
}

const validateObj: Validator<Object> = {
  name: {
    invalid: (val) => {
      return val.length > 5 ? null : messages.name
    }
  },
  duration: {
    invalid: (val) => {
      return val >= 5 && val <= 10 ? null : messages.duration
    }
  },
  values: {
    invalid: (val) => {
      return val.length === 3 ? null : messages.values
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
      name: [messages.name]
    }

    expect(objValidator(obj)).toEqual(expectedValue)
  })

  it('should be able to handle multiple errors', () => {
    obj.duration = 0
    obj.values = ['oe', 'two']
    const expectedValue: ValidatorResponseObject<Object> = {
      duration: [messages.duration],
      values: [messages.values],
    }
    expect(objValidator(obj)).toEqual(expectedValue)
  })

})
