import * as React from 'react'

import * as Models from './../../models'

import DatePickerDay from './DatePickerDay'

const styles = require('./DatePickerWeek.css')

interface Props extends Models.Week { }

const generateDays = ({days}: Props) => {
  return Object.keys(days).map((dayKey) => <DatePickerDay {...days[dayKey]} />)
}

const DatePickerWeek: React.StatelessComponent<any> = (props: Props) => {
  const {days} = props
  return (
    <div className={styles.week}>
      {generateDays(props)}
    </div>
  )
}

export default DatePickerWeek
