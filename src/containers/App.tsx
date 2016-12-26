import * as M from 'moment'
import * as React from 'react'
import { Component, PropTypes } from 'react'

import Calendar from './../components/calendar/Calendar'
import Navbar from './../components/layout/Navbar'
import PaneBody from './../components/layout/PaneBody'
import PaneContainer from './../components/layout/PaneContainer'
import PaneContent from './../components/layout/PaneContent'
import PaneHeader from './../components/layout/PaneHeader'
import PaneSidebar from './../components/layout/PaneSidebar'
import * as DateUtils from './../utils/date.utils'

import './App.css'

interface Props {

}

interface State {

}

class App extends Component<Props, State> {
  public static proptypes = {

  }

  public render() {
    return (
      <div>
        <Navbar></Navbar>
        <PaneContainer>

          <PaneSidebar>
            <PaneHeader>Sidebar Header</PaneHeader>
            <PaneContent></PaneContent>
          </PaneSidebar>

          <PaneBody>
            <PaneHeader>Toolbar Header</PaneHeader>
            <PaneContent>
              <Calendar
                startDate={DateUtils.startOfMonth(M()).format()}
                endDate={DateUtils.endOfMonth(M()).format()} >
              </Calendar>
            </PaneContent>
          </PaneBody>

        </PaneContainer>
      </div>
    )
  }
}

export default App
