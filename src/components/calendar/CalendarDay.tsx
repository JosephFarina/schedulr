import * as React from 'react'

import * as Models from './../../models'

const styles = require('./CalendarDay.css')

interface Props extends Models.DayOnly {

}

const CalendarDay: React.StatelessComponent<Props> = (props: Props) => {
  return (
    <div className={styles.day}>
      {props.date}
    </div>
  )
}

export default CalendarDay
