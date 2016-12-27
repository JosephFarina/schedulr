import * as M from 'moment'
import * as React from 'react'
require('moment-range')

import * as DateUtils from './../../utils/date.utils'
import CalendarContent from './CalendarContent'
import CalendarHeader from './CalendarHeader'
import CalendarWeek from './CalendarWeek'

const styles = require('./Calendar.css')

interface Props {
  startDate: string
  endDate: string
}

const generateWeeks = ({ startDate, endDate }: Props) => {
  const build = DateUtils.getTimeRangeBuild(
    M.range([ M(startDate),  M(endDate) ])
  )
  const weeks = build.weeks

  const keys = Object.keys(weeks).sort((a, b) => { return +a - +b })
  console.log(keys)
  return keys.map((key, i) => <CalendarWeek key={i} {...build.weeks[key]} />)
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
