import * as React from 'react'

const styles = require('./CalendarHeader.css')

interface Props {

}

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday']

const CalendarHeader = (props: Props) => {
  return (
    <div className={styles.week}>
      {weekdays.map((day) => <div className={styles.day}>{day}</div>)}
    </div>
  )
}

export default CalendarHeader
