import * as M from 'moment'

export function mergeTimeIntoDate(_date: string, _time: string): string {
  const date = M(_date)
  const time = M(_time)
  return date.hour(time.hour()).minute(time.minute()).second(0).format()
}
