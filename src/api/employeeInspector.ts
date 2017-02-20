import { UnnormalizedShift } from 'src/models'
import { getUnnormalizedShifts } from 'src/testUtils'

export interface EmployeeDetailAPICall {
  upcomingShifts: UnnormalizedShift
}

export function getEmployeeDetails(id): Promise<EmployeeDetailAPICall> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({
        upcomingShifts: getUnnormalizedShifts(id)
      })
    }, 400)
  })
}
