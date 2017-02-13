import * as React from 'react'
import ShiftEditor from './../containers/ShiftEditor'

import {
  PaneContent,
  PaneSidebar,
} from 'src/shared/components'

const NewShiftSideBar = (props) => (
  <PaneSidebar>
    <PaneContent noHeader>
      <ShiftEditor />
    </PaneContent>
  </PaneSidebar>
)

export default NewShiftSideBar
