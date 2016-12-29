import * as React from 'react'

import * as Models from './../../models'

import DatePickerHeader from './DatePickerHeader'
import DatePickerWeek from './DatePickerWeek'

const styles = require('./DatePicker.css')

interface Props {
  timeRange: Models.TimeRange,
  nextRange: Function,
  prevRange: Function
}

const generateWeeks = ({timeRange}: Props): any => {
  const { weeks } = timeRange
  return Object.keys(timeRange.weeks).map((weekKey, i) => <DatePickerWeek key={i} {...weeks[weekKey]} />)
}

const DatePicker: React.StatelessComponent<Props> = (props: Props) => {
  const { nextRange, prevRange, timeRange } = props
  const { month } = timeRange

  return (
    <div className={styles.container}>
      <DatePickerHeader month={month} nextRange={nextRange} prevRange={prevRange} />
      {generateWeeks(props)}
    </div>
  )
}

export default DatePicker
