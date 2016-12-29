import * as React from 'react'

import * as Models from './../../models'

import DatePickerDay from './DatePickerDay'

const styles = require('./DatePickerWeek.css')

interface Props extends Models.Week {
  month: number
}

const generateDays = ({days, month}: Props) => {
  return Object.keys(days).map((dayKey, i) => <DatePickerDay month={month} key={i} {...days[dayKey]} />)
}

const DatePickerWeek: React.StatelessComponent<any> = (props: Props) => {
  return (
    <div className={styles.week}>
      {generateDays(props)}
    </div>
  )
}

export default DatePickerWeek
