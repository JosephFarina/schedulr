import * as M from 'moment'
import * as React from 'react'
require('moment-range')

import * as Models from './../../models'
import CalendarContent from './CalendarContent'
import CalendarHeader from './CalendarHeader'
import CalendarWeek from './CalendarWeek'

const styles = require('./Calendar.css')

interface Props extends Models.CalendarObject<Models.DayOnly> {}

const generateWeeks = (props: Props) => {
  const { weeks } = props

  return Object.keys(weeks).map((weekKey, i) => {
    const week = weeks[weekKey]
    return <CalendarWeek key={i} {...week} />
  })
}

const Calendar: React.StatelessComponent<Props> = (props) => {

  return (
    <div className={styles.container}>
      <CalendarHeader></CalendarHeader>
      <CalendarContent>
        {generateWeeks(props)}
      </CalendarContent>
    </div>
  )
}


export default Calendar
