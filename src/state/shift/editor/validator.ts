import * as M from 'moment'

import {
  validatorFactory
} from 'src/utils'

import {
  ShiftTemplate,
  Validator
} from 'src/models'

const shiftValidator: Validator<ShiftTemplate> = {
  client: {
    invalid: (val) => {
      return !!val ? null : 'Client must be present'
    }
  },
  location: {
    invalid: (val) => {
      return !!val ? null : 'Location must be present'
    }
  },
  id: {
    invalid: (val) => {
      return null
    }
  },
  startTime: {
    invalid: (val) => {
      return null
    }
  },
  duration: {
    invalid: (val) => {
      return val >= 15 ? null : 'It must be at least 15 minutes long'
    }
  }
}

export const shiftEditorValidator = validatorFactory(shiftValidator)
