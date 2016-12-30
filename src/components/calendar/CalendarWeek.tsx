import * as React from 'react'

import * as Models from './../../models'
import CalendarDay from './CalendarDay'

const styles = require('./CalendarWeek.css')

interface Props extends Models.Week<Models.DateOnly> { }

const generateWeek = ({days}: Props) => {
  return Object.keys(days).map((key) => (
    <CalendarDay key={key} {...days[key]} />
  ))
}

const CalendarWeek: React.StatelessComponent<Props> = (props: Props) => {
  return (
    <div className={styles.week}>
      {generateWeek(props)}
    </div>
  )
}

export default CalendarWeek
