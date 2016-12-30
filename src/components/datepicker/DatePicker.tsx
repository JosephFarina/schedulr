import * as React from 'react'

import * as Models from './../../models'

import DatePickerHeader from './DatePickerHeader'
import DatePickerWeek from './DatePickerWeek'

const styles = require('./DatePicker.css')

interface Props {
  timeRange: Models.CalendarObject<Models.DayOnly>,
  selectedRange: Models.CalendarObject<Models.DayOnly>
  nextRange: Function,
  prevRange: Function
}

const generateWeeks = ({timeRange, selectedRange}: Props): any => {
  const { weeks, month } = timeRange


  // returns an array of {week: weekNumber<number>, year: <number>}
  // used to tell week if they are selected
  const selectedWeeks = Object.keys(selectedRange.weeks).map((weekKey) => {
    const week = selectedRange.weeks[weekKey]
    return {
      week: weekKey,
      year: week.year
    }
  })

  return Object.keys(timeRange.weeks).map((weekKey, i) => <DatePickerWeek
    weekNumber={weekKey}
    selected={selectedWeeks}
    month={month}
    key={i}
    {...weeks[weekKey]} />)
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
