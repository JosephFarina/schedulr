import * as M from 'moment'

import {
  getMoRange,
  validatorFactory,
} from 'src/utils'

import {
  getEmployeesInShiftBeingCreated,
  getGeneratedShifts,
  getShifts
} from './..'

import {
  RState,
  Shift,
  ShiftTemplate,
  Validator,
  ValidatorResponseObject
} from 'src/models'

import {
  getEmployeeById
} from 'src/state/entities'

function createValidator(state: RState, shift: Shift): Validator<Shift> {
  return {
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
    employee: {
      invalid: (val) => {
        if (!shift.employee) {
          return null
        }

        const allShifts = getShifts(state)
        const shiftBeingValidatedTimeRange = getMoRange(shift.startTime, shift.duration)
        const shiftBeingValidatedEmployee = getEmployeeById(state, shift.employee)

        const reduced = Object.keys(allShifts).reduce((shifts, s) => {
          const currShift = allShifts[s]

          if (currShift.employee === shift.employee) {
            const currShiftTimeRange = getMoRange(currShift.startTime, currShift.duration)
            const overlap = currShiftTimeRange.overlaps(shiftBeingValidatedTimeRange)

            if (overlap) {
              return [...shifts, true]
            }
          }

          return shifts
        }, [])

        return reduced.length === 0 ? null : `${shiftBeingValidatedEmployee.alias} is already scheduled at this time`
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
}

export function validateShifts(state: RState): ValidatorResponseObject<Shift> {
  const shifts = getGeneratedShifts(state)

  return shifts.reduce((res: ValidatorResponseObject<Shift>, shift) => {
    const shiftValidator = validatorFactory(createValidator(state, shift))
    const invalid = shiftValidator(shift)

    if (invalid && invalid.employee) {
      const nextEmployee = Array.isArray(res.employee) ? res.employee.concat(invalid.employee) : [].concat(invalid.employee)
      return Object.assign({}, res, invalid, { employee: nextEmployee })

    } else {
      return Object.assign({}, res, invalid)
    }

  }, {})
}
