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
