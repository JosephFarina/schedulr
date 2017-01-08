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

export function rangeParse(_day: MorString, time: string): M.Moment[] {
  return [
    // timeParser(),
    // timeParser()
  ]
}

/*

rounds to the nearest 15

accepted values:
- 5a
- 5am
- 6p
- 5pm
- 3:15pm
- 12:30am

- 12
- 15
- 2
- 5:30
- 5:40 == 5:45
*/

export function timeParser(_day: MorString, _time: number | string): M.Moment {
  const time: string = '' + _time
  const day = cloneOrCreateMo(_day).hour(0).minutes(0).seconds(0)
  const meridiem = isAmOrPm(time)
  let hour: number = +time.replace(/[^0-9]/g, '')

  if (meridiem === 'am' && hour === 12) {
    hour = 0
  } else if (meridiem === 'pm' && hour === 12)  {
    hour = 12
  } else if (meridiem === 'pm') {
    hour += 12
  }

  day.hour(hour)
  return day
}

function isAmOrPm(time: string): 'am' | 'pm' | 'na' {
  if (time.match(/[Pp]/)) {
    return 'pm'
  } else if (time.match(/[Aa]/)) {
    return 'am'
  } else {
    return 'na'
  }
}
