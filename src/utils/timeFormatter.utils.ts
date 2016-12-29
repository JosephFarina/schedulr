import * as M from 'moment'

import * as MomentHelpers from './momentHelpers.util'

export const getDayOfMonth = (input: MomentHelpers.MorString) => {
  const date = MomentHelpers.cloneOrCreateMo(input)
  return date.date()
}
