import {
  getMoRange,
  validatorFactory,
} from 'src/utils'

import {
  getGeneratedShifts,
  getShifts
} from './..'

import {
  RState,
  Shift,
  Validator,
  ValidatorResponseObject
} from 'src/models'

import {
  getEmployeeById
} from 'src/state/entities'

function createValidator(state: RState, shiftBeingValidated: Shift): Validator<Shift> {
  return {
    client: {
      invalid: (val) => {
        return !val ? ['Client must be present'] : null
      }
    },
    location: {
      invalid: (val) => {
        return !val ? ['Location must be present'] : null
      }
    },
    id: {
      invalid: (val) => {
        return null
      }
    },
    employee: {
      invalid: (val) => {
        return null
      }
    },
    startTime: {
      invalid: (val) => {
        // its always ok if there isnt an employee
        if (!shiftBeingValidated.employee) { return null }

        const shifts = getShifts(state)
        const shiftBeingValidatedTimeRange = getMoRange(shiftBeingValidated.startTime, shiftBeingValidated.duration)
        const shiftBeingValidatedEmployee = getEmployeeById(state, shiftBeingValidated.employee)
        const shiftOverlapsSavedShift: boolean = Object.keys(shifts).reduce((res, shiftId) => {
          const shift = shifts[shiftId]

          // Only focus at employees that are the same as the shift being validated
          if (shift.employee === shiftBeingValidated.employee) {
            const currShiftTimeRange = getMoRange(shift.startTime, shift.duration)
            const thereIsOverlap = currShiftTimeRange.overlaps(shiftBeingValidatedTimeRange)
            if (thereIsOverlap) { return true }
          }

          return res
        }, false)

        return shiftOverlapsSavedShift ? [`${shiftBeingValidatedEmployee.alias} is already scheduled at this time`] : null
      }
    },
    duration: {
      invalid: (val) => {
        return val < 15 ? ['It must be at least 15 minutes long'] : null
      }
    }
  }
}

export function validateNewShifts(state: RState): ValidatorResponseObject<Shift> {
  return getGeneratedShifts(state).reduce((mergedShiftResObject: ValidatorResponseObject<Shift>, shift) => {
    // creates a unique validator for each shift object while passing in state and shift and than validates shift
    const shiftResObject = validatorFactory(createValidator(state, shift))(shift)

    if (shiftResObject && shiftResObject.startTime) {
      const currStartTime = shiftResObject.startTime
      const mergedStarTime = mergedShiftResObject.startTime

      return Object.assign({}, mergedShiftResObject, shiftResObject, {
        startTime: Array.isArray(mergedShiftResObject.startTime) ? mergedStarTime.concat(currStartTime) : [].concat(currStartTime)
      })
    }

    return Object.assign({}, mergedShiftResObject, shiftResObject)
  }, {})
}
