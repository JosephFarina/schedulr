import { Moment } from 'moment'
import * as React from 'react'
import { Component, PropTypes } from 'react'
import {
  MapStateToProps,
  connect,
} from 'react-redux'

import { getMomentDate } from 'src/state/calendar/selector'

import {
  getScheduleSidebarMode
} from 'src/state/ui/sidebar/selector'

import * as Models from 'src/models'
import * as CalendarActions from 'src/state/calendar/action'
import * as SidebarActions from 'src/state/ui/sidebar/action'

import ShiftEditor from './ShiftEditor'
import Calendar from 'src/shared/components/calendar/Calendar'

import {
  Button,
  ButtonGroup,
  PaneContent,
  PaneHeader,
  PaneSidebar,
} from 'src/shared/components'

interface Props {
  dispatch: Function,
  date: Moment
}

interface State {

}

class NewShiftSideBar extends React.Component<Props, State> {
  public static proptypes = {
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props: any) {
    super(props)
    this.nextRange = this.nextRange.bind(this)
    this.prevRange = this.prevRange.bind(this)
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
   * Render
   * 
   */

  public render() {
    return (
      <PaneSidebar maximized split>
        <PaneContent noHeader>
          <ShiftEditor />
        </PaneContent>
        <PaneContent noHeader>

        </PaneContent>
      </PaneSidebar>
    )
  }
}

const mapStateToProps: MapStateToProps<any, any> = (state: Models.RState, ownProps: Props) => {
  return {
    date: getMomentDate(state)
  }
}

export default connect(mapStateToProps)(NewShiftSideBar)
