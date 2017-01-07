import * as M from 'moment'

import {
  isMoment,
  isString,
} from 'src/utils'

export declare type MorString = M.Moment | string

export const cloneOrCreateMo = (mo?: MorString): M.Moment => {
  let date: M.Moment

  if (!mo) {
    date = M()
  } else if (isString(mo)) {
    date = M(mo)
  } else if (isMoment(mo)) {
    date = (<M.Moment>mo).clone()
  }

  return date
}

export const rangeFromMoOrString = (startInput: MorString, endInput: MorString): M.Range => {
  const start = cloneOrCreateMo(startInput)
  const end = cloneOrCreateMo(endInput)
  return M.range([start, end])
}

export const isSameMonth = (input: MorString, month: number) => {
  const date = cloneOrCreateMo(input)
  return date.month() === month
}

export const getWeek = (input: MorString): number => {
  const date = cloneOrCreateMo(input)
  return date.week()
}

export const getYear = (input: MorString): number => {
  const date = cloneOrCreateMo(input)
  return date.year()
}