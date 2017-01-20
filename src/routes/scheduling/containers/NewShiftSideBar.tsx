import { Moment } from 'moment'
import * as React from 'react'
import { Component, PropTypes } from 'react'
import {
  MapStateToProps,
  connect,
} from 'react-redux'

import { getMomentDate } from 'src/state/calendar/selector'

import * as Models from 'src/models'
import * as CalendarActions from 'src/state/calendar/action'

import ShiftEditor from './ShiftEditor'

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
      <PaneSidebar noHeader>
        <PaneContent noHeader>
          <ShiftEditor />
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
