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
import * as SidebarActions from './../state/ui/sidebar/action'

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

  constructor(props: any) {
    super(props)
    this.nextRange = this.nextRange.bind(this)
    this.prevRange = this.prevRange.bind(this)
    this.inspectorMode = this.inspectorMode.bind(this)
    this.newShiftMode = this.newShiftMode.bind(this)
  }

  /**
   * 
   * Change time range
   * 
   */

  public nextRange() {
    const { dispatch } = this.props
    dispatch(CalendarActions.nextTimeRange())
  }

  public prevRange() {
    const { dispatch } = this.props
    dispatch(CalendarActions.previousTimeRange())
  }

  /**
   * 
   * Change sidebar mode
   * 
   */

  public inspectorMode() {
    const { dispatch } = this.props
    dispatch(SidebarActions.setSidebarModeToInspector())
  }

  public newShiftMode() {
    const { dispatch } = this.props
    dispatch(SidebarActions.setSidebarModeToNewShift())
  }

  /**
   * 
   * Render Elements Conditionally
   * 
   */

  public renderCalendarWidget(props: Props) {
    const {
      date,
      sidebarMode
    } = props

    const shouldRender = sidebarMode === 'filter' || sidebarMode === 'inspector'

    if (shouldRender) {
      return (
        <Calendar
          month={date}
          onNextRangeClick={this.nextRange}
          onPrevRangeClick={this.prevRange}
          selectedWeek={date}
          isDatePicker={true}
          />
      )
    } else {
      return null
    }
  }


  /**
   * Render
   */

  public render() {
    const {
      sidebarMode
    } = this.props

    return (
      <PaneSidebar maximized={sidebarMode === 'newShift'}>
        <PaneHeader>
          <button onClick={this.inspectorMode} >inspector</button>
          <button onClick={this.newShiftMode}> New shift</button>
        </PaneHeader>
        <div></div>
        {this.renderCalendarWidget(this.props)}
      </PaneSidebar>
    )
  }
}

const mapStateToProps: MapStateToProps<any, any> = (state: Models.RState, ownProps: Props) => {
  return {
    sidebarMode: getScheduleSidebarMode(state),
    date: getMomentDate(state),
  }
}

export default connect(mapStateToProps)(SideBar)
