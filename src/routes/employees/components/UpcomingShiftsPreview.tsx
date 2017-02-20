import * as React from 'react'

import { UnnormalizedShift } from 'src/models'
import { getMoRange } from 'src/utils'
const Timeline = require('antd/lib/timeline')

interface Props {
  shifts?: UnnormalizedShift[]
}

const UpcomingShift = ({client, location, startTime, duration}: UnnormalizedShift) => {
  const range = getMoRange(startTime, duration)

  return (
    <Timeline.Item>
      <h3><strong>{range.start.format()}</strong></h3>
      <div><strong>Time:</strong> {range.start.format('hh:mm')}—{range.end.format('hh:mm')}</div>
      <div><strong>Client:</strong> {client.alias}</div>
      <div><strong>Location:</strong> {location.alias}</div>
    </Timeline.Item>
  )
}

const UpcomingShiftsPreview = (props: Props) => (
  <Timeline pending={<a href="#">See more</a>}>
    {props.shifts.map(shift => <UpcomingShift {...shift} />)}
  </Timeline>
)

export default UpcomingShiftsPreview
