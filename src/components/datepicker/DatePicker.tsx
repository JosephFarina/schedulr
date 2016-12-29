import * as React from 'react'

import * as Models from './../../models'

import DatePickerHeader from './DatePickerHeader'
import DatePickerWeek from './DatePickerWeek'

const styles = require('./DatePicker.css')

interface Props {
  timeRange: Models.TimeRange
}

const generateWeeks = ({timeRange}: Props): any => {
  const { weeks } = timeRange
  return Object.keys(timeRange.weeks).map((weekKey) => <DatePickerWeek {...weeks[weekKey]} />)
}

const DatePicker: React.StatelessComponent<Props> = (props: Props) => {
  return (
    <div className={styles.container}>
      <DatePickerHeader />
      {generateWeeks(props)}
    </div>
  )
}

export default DatePicker
