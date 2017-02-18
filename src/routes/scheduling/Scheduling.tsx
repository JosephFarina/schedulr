import * as React from 'react'

import SchedulingCalendar from './containers/SchedulingCalendar'
import { Pane, MainPane } from 'src/shared'

interface SchedulingProps {
  sidebar: React.ReactChildren
}

const Scheduling: React.StatelessComponent<SchedulingProps> = (props: SchedulingProps) => {
  const { sidebar } = props

  return (
    <div>
      <Pane>
        {sidebar}
        <MainPane>
          <SchedulingCalendar />
        </MainPane>
      </Pane>
    </div>
  )
}

export default Scheduling
