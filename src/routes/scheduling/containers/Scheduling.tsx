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
import Calendar from 'src/shared/components/calendar/Calendar'

import {
  PaneBody,
  PaneContainer,
  PaneContent,
  PaneHeader
} from 'src/shared/components/layout'

import './Scheduling.css'

interface Props {
  dispatch: Function,
  date: M.Moment
  shifts: Models.ShiftTemplate[]
}

interface State {

}

class Scheduling extends React.Component<Props, State> {
  public static proptypes = {
    dispatch: PropTypes.func.isRequired
  }

  public render() {
    const { date, shifts } = this.props

    return (
      <PaneContainer>

        <Sidebar />

        <PaneBody>
          <PaneHeader>Toolbar Header</PaneHeader>
          <PaneContent>
            <Calendar shifts={shifts} week={date} />
          </PaneContent>
        </PaneBody>

      </PaneContainer>
    )
  }
}

const mapStateToProps: MapStateToProps<any, any> = (state: Models.RState, ownProps: Props) => {
  return {
    date: getMomentDate(state),
    shifts: getShifts(state)
  }
}

export default connect(mapStateToProps)(Scheduling)
