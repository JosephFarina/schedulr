import * as M from 'moment'

import {
  MorString,
  cloneOrCreateMo,
} from 'src/utils'


/*
splits the time string entered by -_\|/~,
if it cant find a deliminator throw Error
then returns the parsed time for the start and end time
*/

export function rangeParser(_day: MorString, time: string): M.Moment[] {
  const deliminators = /[-_\\|\/~,]/g

  if ((time.match(deliminators) || []).length === 1) {
    const day = cloneOrCreateMo(_day)
    const [start, end] = time.split(deliminators)
    const parsedStart = timeParser(day, start)
    const parsedEnd = timeParser(day, end)

    if (parsedEnd <= parsedStart) {
      return null
    }

    if (parsedStart && parsedEnd) {
      return [parsedStart, parsedEnd]
    } else {
      return null
    }

  }

  return null
}

/**
 * rounds to the nearest 15

 * accepted values:
 * - 5a
 * - 5am
 * - 6p
 * - 5pm
 * - 3:15pm
 * - 12:30am

 * - 12
 * - 15
 * - 2
 * - 5:30
 * - 5:40 == 5:45
 */

export function timeParser(day: MorString, time: string): M.Moment {
  const meridiem = isAmOrPm(time)
  const strippedTime = time.replace(/[^0-9:]/g, '')

  if (!strippedTime) {
    return null
  }

  const [hour, minutes] = getHoursAndMinutes(strippedTime)
  const calculatedHour = calculateActualHour(hour, meridiem)
  const roundedMinutes = roundMinutes(minutes)

  return cloneOrCreateMo(day).hour(calculatedHour).minutes(roundedMinutes).seconds(0)
}

function calculateActualHour(hour: number, meridiem: 'am' | 'pm' | 'na'): number {
  if (meridiem === 'am' && hour === 12) {
    return 0
  } else if (meridiem === 'pm' && hour === 12) {
    return 12
  } else if (meridiem === 'pm') {
    return hour += 12
  } else {
    return hour
  }
}

function roundMinutes(mins: number): number {
  if (mins >= 59) { return 59 }

  const interval = 15
  const remainder = mins % interval
  const highInterval = Math.ceil(mins / interval)
  const lowInterval = Math.floor(mins / interval)
  const halfwayPoint = interval / 2
  return remainder >= halfwayPoint ? highInterval * interval : lowInterval * interval
}

// index 0 is hour | index 1 is minute -- if null no minutes found
function getHoursAndMinutes(time: string | number): number[] {
  if (typeof time === 'number') {
    return [time, null]
  } else if (/:/.test(time)) {
    return time.split(':').map(i => +i)
  } else {
    return [+time, null]
  }
}

function isAmOrPm(time: string): 'am' | 'pm' | 'na' {
  if (/[Pp]/.test(time)) {
    return 'pm'
  } else if (/[Aa]/.test(time)) {
    return 'am'
  } else {
    return 'na'
  }
}
