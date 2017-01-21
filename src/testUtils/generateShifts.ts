import * as M from 'moment'

import { Shifts } from 'src/models'
import {
  MorString,
  cloneOrCreateMo,
} from 'src/utils'

import {
  clientsOneArray,
  employeesOneArray,
  locationsOneArray,
} from 'src/testUtils'

/** 
 * Generates a weeks worth of shift 
 * 
 */

export function generateShifts(_startTime: MorString): Shifts {
  const startTime = cloneOrCreateMo(_startTime)
  const shifts: Shifts = {}
  const startDate = startTime.clone().startOf('week').hour(12)
  const endDate = startTime.clone().endOf('week').hour(12)
  let currDate = startDate.clone()

  while (currDate < endDate) {

    if (currDate.day() % 2 === 0) {
      shifts[`${currDate.format()}`]
      addShifts(shifts, currDate.format(), 5)
    } else {
      addShifts(shifts, currDate.format(), 3)
    }

    currDate.add(1, 'day')
  }

  return shifts
}


function addShifts(shifts: Shifts, date: string, times: number): void {
  for (let i = 0; i < times; i++) {
    const id = `${date}__${i}`
    shifts[id] = {
      id,
      employee: employeesOneArray[Math.floor(Math.random() * employeesOneArray.length)].id,
      startTime: date,
      duration: 60 * 8
    }
  }
}
