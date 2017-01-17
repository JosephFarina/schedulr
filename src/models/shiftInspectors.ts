import { Employee } from './entities'

export interface APIShiftInspector {
  id?: string
  date?: string
  startTime?: string
  endTime?: string
  duration?: string

  employee: {
    id?: string
    firstName?: string
    lastName?: string
    hoursScheduled?: number
    shiftCount?: number
    // if open shift
    availableEmployees?: Employee[]
  }

  client: {
    id?: string
    alias?: string
    hoursScheduled?: number
    employeesScheduled?: Employee[]
  }

  location: {
    id?: string
    alias?: string
    hoursScheduled?: number
    employeesScheduled?: Employee[]
    latitude?: number
    longitude?: number
  }
}
