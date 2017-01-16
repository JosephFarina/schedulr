import * as React from 'react'

import SchedulingCalendar from './containers/SchedulingCalendar'
import { PaneContainer } from 'src/shared/components/layout'

interface SchedulingProps {
  sidebar: React.ReactChildren
}

const Scheduling: React.StatelessComponent<SchedulingProps> = (props: SchedulingProps) => {
  const {
    sidebar
  } = props

  return (
    <PaneContainer>
      {/*<Sidebar />*/}
      {sidebar}
      <SchedulingCalendar />
    </PaneContainer>
  )
}

export default Scheduling
