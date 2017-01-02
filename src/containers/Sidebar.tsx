import { Moment } from 'moment'
import * as React from 'react'
import { Component, PropTypes } from 'react'
import {
  MapStateToProps,
  connect,
} from 'react-redux'

import { getMomentDate } from './../state/calendar/selector'

import {
  getScheduleSidebarMode
} from './../state/ui/sidebar/selector'

import * as Models from './../models'

import * as CalendarActions from './../state/calendar/action'

import Calendar from './../components/calendar/Calendar'
import PaneHeader from './../components/layout/PaneHeader'
import PaneSidebar from './../components/layout/PaneSidebar'

import './App.css'

interface Props {
  dispatch: Function,
  sidebarMode: Models.ScheduleSidebarMode
  date: Moment
}

interface State {

}

class SideBar extends React.Component<Props, State> {
  public static proptypes = {
    dispatch: PropTypes.func.isRequired,
  }

  public nextRange() {
    const { dispatch } = this.props
    dispatch(CalendarActions.nextTimeRange())
  }

  public prevRange() {
    const { dispatch } = this.props
    dispatch(CalendarActions.previousTimeRange())
  }


  public render() {
    const {
      date
    } = this.props

    return (<PaneSidebar >
      <PaneHeader>Sidebar Header</PaneHeader>
      <Calendar
        month={date}
        onNextRangeClick={this.nextRange.bind(this)}
        onPrevRangeClick={this.prevRange.bind(this)}
        selectedWeek={date}
        isDatePicker={true}
        />
    </PaneSidebar>)
  }
}

const mapStateToProps: MapStateToProps<any, any> = (state: Models.RState, ownProps: Props) => {
  return {
    sidebarMode: getScheduleSidebarMode(state),
    date: getMomentDate(state),
  }
}

export default connect(mapStateToProps)(SideBar)
