import * as M from 'moment'

import {
  rangeParser,
  timeParser,
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
      const expectedValue = setMoment(+hour, +minutes)
      expect(parsedTime.format()).toEqual(expectedValue.format())
    })
  })

  it('should round minutes to 15 or 0 depending on what its closer to', () => {
    // should be 0
    '00 01 02 03 04 05 06 07'.split(' ').forEach(mins => {
      const time = `1:${mins}`
      const parsedTime = timeParser(today.clone(), time)
      const [hour, minutes] = time.split(':')
      const expectedValue = setMoment(+hour, 0)
      expect(parsedTime.format()).toEqual(expectedValue.format())
    })

    // should be 15
    '08 09 10 11 12 13 14 15'.split(' ').forEach(mins => {
      const time = `1:${mins}`
      const parsedTime = timeParser(today.clone(), time)
      const [hour, minutes] = time.split(':')
      const expectedValue = setMoment(+hour, 15)
      expect(parsedTime.format()).toEqual(expectedValue.format())
    })

    // should be 0
    '30 31 32 33 34 35 36 37'.split(' ').forEach(mins => {
      const time = `1:${mins}`
      const parsedTime = timeParser(today.clone(), time)
      const [hour, minutes] = time.split(':')
      const expectedValue = setMoment(+hour, 30)
      expect(parsedTime.format()).toEqual(expectedValue.format())
    })

    // should be 15
    '38 39 40 41 42 43 44 45'.split(' ').forEach(mins => {
      const time = `1:${mins}`
      const parsedTime = timeParser(today.clone(), time)
      const [hour, minutes] = time.split(':')
      const expectedValue = setMoment(+hour, 45)
      expect(parsedTime.format()).toEqual(expectedValue.format())
    })
  })

  it('mins should only go as high as 59', () => {
    const parsedTime = timeParser(today.clone(), '1:72')
    const expectValue = setMoment(1, 59)
    expect(parsedTime.format()).toEqual(expectValue.format())
  })

})

describe('#rangeParser', () => {

  it('should split -_\|/~,', () => {
    '-_\|/~,'.split('').forEach(deliminator => {
      const timeRange = `1:15a ${deliminator} 12pm`
      const [parsedStart, parsedEnd] = rangeParser(today.clone(), timeRange)
      expect([
        parsedStart.format(),
        parsedEnd.format()])
        .toEqual([
          setMoment(1, 15).format(),
          setMoment(12).format()
        ])
    })
  })

  it('if it doesnt contain a deliminator it should return null', () => {
    const timeRange = '1:15a 2p'
    const res = rangeParser(today.clone(), timeRange)
    expect(res).toEqual(null)
  })

  it('if it contains more than one delimanator it should return null', () => {
    const timeRange = '1:15a - 2p - 3p'
    const res = rangeParser(today.clone(), timeRange)
    expect(res).toEqual(null)
  })

})


function setMoment(hour: number, minutes = 0): M.Moment {
  return M().hour(hour).minutes(minutes).seconds(0)
}
