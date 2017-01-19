import { Moment } from 'moment'
import {
  Client,
  Employee,
  Location,
  Shift
} from 'src/models'

export interface GeneralInspector {
  startTime?: Moment
  endTime?: Moment

  cumulativeHours?: {
    [employeeId: string]: number
  }

  shifts?: Shift[]
  employees?: Employee[]
  clients?: Client[]
  locations?: Location[]
}

// export interface APIShiftInspector {
//   id?: string
//   date?: string
//   startTime?: string
//   endTime?: string
//   duration?: string

//   employee: {
//     id?: string
//     firstName?: string
//     lastName?: string
//     hoursScheduled?: number
//     shiftCount?: number
//     // if open shift
//     availableEmployees?: Employee[]
//   }

//   client: {
//     id?: string
//     alias?: string
//     hoursScheduled?: number
//     employeesScheduled?: Employee[]
//   }

//   location: {
//     id?: string
//     alias?: string
//     hoursScheduled?: number
//     employeesScheduled?: Employee[]
//     latitude?: number
//     longitude?: number
//   }
// }
