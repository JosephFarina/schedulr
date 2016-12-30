import * as M from 'moment'

import * as TypeChecking from './typeChecking.util'

export declare type MorString = M.Moment | string

export const cloneOrCreateMo = (mo?: MorString): M.Moment => {
  let date: M.Moment

  if (!mo) {
    date = M()
  } else if (TypeChecking.isString(mo)) {
    date = M(mo)
  } else if (TypeChecking.isMoment(mo)) {
    date = (<M.Moment>mo).clone()
  }

  return date
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