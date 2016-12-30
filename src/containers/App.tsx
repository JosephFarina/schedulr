import * as M from 'moment'
import * as React from 'react'
import { Component, PropTypes } from 'react'
import {
  MapStateToProps,
  connect,
} from 'react-redux'


import * as Models from './../models'
import * as CalendarActions from './../state/calendar/action'
import * as CalendarSelectors from './../state/calendar/selector'

import Calendar from './../components/calendar/Calendar'
import Navbar from './../components/layout/Navbar'
import PaneBody from './../components/layout/PaneBody'
import PaneContainer from './../components/layout/PaneContainer'
import PaneContent from './../components/layout/PaneContent'
import PaneHeader from './../components/layout/PaneHeader'
import PaneSidebar from './../components/layout/PaneSidebar'

import DatePicker from './../components/datepicker/DatePicker'

import './App.css'

interface Props {
  dispatch: Function,
  timeRange: Models.CalendarObject<Models.DayOnly>,
  monthTimeRange: Models.CalendarObject<Models.DayOnly>
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
    const { timeRange, monthTimeRange } = this.props
    return (
      <div>
        <Navbar></Navbar>
        <PaneContainer>

          <PaneSidebar>
            <PaneHeader>Sidebar Header</PaneHeader>
            <PaneContent>

              <DatePicker
                prevRange={this.prev.bind(this)}
                nextRange={this.next.bind(this)}
                timeRange={monthTimeRange}
                selectedRange={timeRange}
                />

            </PaneContent>
          </PaneSidebar>

          <PaneBody>
            <PaneHeader>Toolbar Header</PaneHeader>
            <PaneContent>
              <Calendar {...timeRange} />
            </PaneContent>
          </PaneBody>

        </PaneContainer>
      </div>
    )
  }
}

const mapStateToProps: MapStateToProps<any, any> = (state: Models.RState, ownProps: Props) => {
  return {
    timeRange: CalendarSelectors.getTimeRangeBuild(state),
    monthTimeRange: CalendarSelectors.getCurrentMonthBuild(state)
  }
}

export default connect(mapStateToProps)(App)
