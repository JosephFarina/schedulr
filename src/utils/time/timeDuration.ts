import * as M from 'moment'

import {
  MorString,
  cloneOrCreateMo,
} from 'src/utils'

export function timeDuration(_start: MorString, _end: MorString): number {
  const start = cloneOrCreateMo(_start)
  const end = cloneOrCreateMo(_end)
  const duration = M.duration(end.diff(start))
  return duration.asMinutes()
}
