import * as M from 'moment'
import * as React from 'react'
import { Component, PropTypes } from 'react'
import {
  MapStateToProps,
  connect,
} from 'react-redux'


import * as Models from 'src/models'
import * as CalendarActions from 'src/state/calendar/action'
import { getMomentDate } from 'src/state/calendar/selector'

import {
  getShifts
} from 'src/state/shift'

import Sidebar from './Sidebar'
import Calendar from 'src/components/calendar/Calendar'
import Navbar from 'src/components/layout/Navbar'
import PaneBody from 'src/components/layout/PaneBody'
import PaneContainer from 'src/components/layout/PaneContainer'
import PaneContent from 'src/components/layout/PaneContent'
import PaneHeader from 'src/components/layout/PaneHeader'

import './App.css'

interface Props {
  dispatch: Function,
  date: M.Moment
  shifts: Models.Shift[]
}

interface State {

}

class App extends React.Component<Props, State> {
  public static proptypes = {
    dispatch: PropTypes.func.isRequired
  }

  public render() {
    const { date, shifts } = this.props
    return (
      <div>
        <Navbar></Navbar>
        <PaneContainer>

          <Sidebar />

          <PaneBody>
            <PaneHeader>Toolbar Header</PaneHeader>
            <PaneContent>
              <Calendar shifts={shifts} week={date} />
            </PaneContent>
          </PaneBody>

        </PaneContainer>
      </div>
    )
  }
}

const mapStateToProps: MapStateToProps<any, any> = (state: Models.RState, ownProps: Props) => {
  return {
    date: getMomentDate(state),
    shifts: getShifts(state)
  }
}

export default connect(mapStateToProps)(App)
