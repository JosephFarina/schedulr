import * as M from 'moment'
import * as React from 'react'
import { Component, PropTypes } from 'react'
import {
  MapStateToProps,
  connect,
} from 'react-redux'


import * as Models from './../models'
import * as CalendarActions from './../state/calendar/action'
import { getMomentDate } from './../state/calendar/selector'
import { getShifts } from './../state/shifts/selector'

import Calendar from './../components/calendar/Calendar'

import Navbar from './../components/layout/Navbar'
import PaneBody from './../components/layout/PaneBody'
import PaneContainer from './../components/layout/PaneContainer'
import PaneContent from './../components/layout/PaneContent'
import PaneHeader from './../components/layout/PaneHeader'
import PaneSidebar from './../components/layout/PaneSidebar'

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

  public next() {
    const { dispatch } = this.props
    dispatch(CalendarActions.nextTimeRange())
  }

  public prev() {
    const { dispatch } = this.props
    dispatch(CalendarActions.previousTimeRange())
  }

  public render() {
    const { date, shifts } = this.props
    return (
      <div>
        <Navbar></Navbar>
        <PaneContainer>

          <PaneSidebar>
            <PaneHeader>Sidebar Header</PaneHeader>
            <PaneContent>
              <Calendar
                month={date}
                onNextRangeClick={this.next.bind(this)}
                onPrevRangeClick={this.prev.bind(this)}
                selectedWeek={date}
                isDatePicker={true}
                />
            </PaneContent>
          </PaneSidebar>

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
