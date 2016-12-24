import * as React from 'react'
import { PropTypes } from 'react'

import CalendarContent from './CalendarContent'
import CalendarHeader from './CalendarHeader'
import CalendarWeek from './CalendarWeek'

const styles = require('./Calendar.css')

interface Props {
  startDate: string
  endDate: string
}


const Calendar: React.StatelessComponent<Props> = (props) => {

  return (
    <div className={styles.container}>
      <CalendarHeader></CalendarHeader>
      <CalendarContent>
        <CalendarWeek></CalendarWeek>
        <CalendarWeek></CalendarWeek>
        <CalendarWeek></CalendarWeek>
        <CalendarWeek></CalendarWeek>
      </CalendarContent>
    </div>
  )
}


export default Calendar
