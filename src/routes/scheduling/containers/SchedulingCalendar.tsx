import * as React from 'react'

import { Moment } from 'moment'

const newIcon = require('public/icons/new.svg')
const inspectIcon = require('public/icons/eye.svg')

const iconStyles = require('src/index.css')

import {
  Link
} from 'react-router'

import {
  RState,
  ShiftTemplate
} from 'src/models'

import {
  MapStateToProps,
  connect,
} from 'react-redux'

import Calendar from 'src/shared/components/calendar/Calendar'

import {
  Button,
  ButtonGroup,
  PaneBody,
  PaneContent,
  PaneHeader,
} from 'src/shared/components'

import { getMomentDate } from 'src/state/calendar'
import { getShifts } from 'src/state/entities'

interface Props {
  dispatch?: Function,
  date: Moment
  shifts: ShiftTemplate[]
}

interface State { }

class SchedulingCalendar extends React.Component<Props, State> {
  public render() {
    const {
      date,
      shifts
    } = this.props

    return (
      <PaneBody>
        <PaneHeader>
          Toolbar Header
          <ButtonGroup maxWidth={400} buttonBar={true}>
            <Button to="/scheduling/new-shift"><img className={iconStyles.toolbarIcon} src={newIcon} /></Button>
            <Button to="/scheduling"><img className={iconStyles.toolbarIcon} src={inspectIcon} /></Button>
          </ButtonGroup>
        </PaneHeader>
        <PaneContent>
          <Calendar shifts={shifts} week={date} />
        </PaneContent>
      </PaneBody>
    )
  }
}

const mapStateToProps: MapStateToProps<any, any> = (state: RState, ownProps: Props) => {
  return {
    date: getMomentDate(state),
    shifts: getShifts(state)
  }
}

export default connect(mapStateToProps)(SchedulingCalendar)
