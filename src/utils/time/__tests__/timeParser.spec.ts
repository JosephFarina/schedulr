import * as M from 'moment'

import {
  timeParser
} from 'src/utils'

/*
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


const today = M()

describe('#timeParser', () => {

  it('return time when just given a number', () => {
    const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 21, 22, 23]
    times.forEach(time => {
      const parsedTime = timeParser(today.clone(), time)
      expect(parsedTime.format()).toEqual(setMoment(time).format())
    })
  })

  it('returns correct time when given am or a', () => {
    '12a 12am'.split(' ').forEach(time => {
      const parsedTime = timeParser(today.clone(), time)
      const expectedValue = setMoment(0)
      expect(parsedTime.format()).toEqual(expectedValue.format())
    })

    '1 2 3 4 5 6 7 8 9 10 11'.split(' ').map(t => [t + 'a', t + 'am']).forEach(times => {
      times.forEach(time => {
        const parsedTime = timeParser(today.clone(), time)
        const expectedValue = setMoment(+time.replace(/[^0-9]/g, ''))
        expect(parsedTime.format()).toEqual(expectedValue.format())
      })
    })
  })

  it('returns correct time when given pm or p', () => {
    '12p 12pm'.split(' ').forEach(time => {
      const parsedTime = timeParser(today.clone(), time)
      const expectedValue = setMoment(12)
      expect(parsedTime.format()).toEqual(expectedValue.format())
    })

    '1 2 3 4 5 6 7 8 9 10 11'.split(' ').map(t => [t + 'p', t + 'pm']).forEach(times => {
      times.forEach(time => {
        const parsedTime = timeParser(today.clone(), time)
        const expectedValue = setMoment(+time.replace(/[^0-9]/g, '') + 12)
        expect(parsedTime.format()).toEqual(expectedValue.format())
      })
    })
  })

  it('should be able to parse minutes properly', () => {
    '1:15 1:45 1:30'.split(' ').forEach(time => {
      const parsedTime = timeParser(today.clone(), time)
      const [hour, minutes] = time.split(':')
      const expectedValue = setMoment(hour, minutes)
      expect(parsedTime.format()).toEqual(expectedValue.format())
    })
  })

})

function setMoment(hour: number, minutes = 0): M.Moment {
  return M().hour(hour).minutes(minutes).seconds(0)
}
