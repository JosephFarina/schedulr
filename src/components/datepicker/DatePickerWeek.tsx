import * as React from 'react'

import * as Models from './../../models'

import DatePickerDay from './DatePickerDay'

const styles = require('./DatePickerWeek.css')

interface Props extends Models.Week {
  month: number
  selected: { week: number, year: number }[]
  weekNumber: number
}

const generateDays = ({days, month}: Props) => {
  return Object.keys(days).map((dayKey, i) => <DatePickerDay month={month} key={i} {...days[dayKey]} />)
}

const weekIsSelectedClass = (props: Props): string => {
  const currWeek = props.weekNumber
  const currYear = props.year
  let isSelected = false

  props.selected.forEach((sel) => {

    if (sel.week === currWeek && sel.year === currYear) {
      isSelected = true
    }
  })

  return isSelected ? styles.selected : ''
}

const DatePickerWeek: React.StatelessComponent<any> = (props: Props) => {
  console.log(weekIsSelectedClass(props))
  return (
    <div className={`${styles.week} ${weekIsSelectedClass(props)}`}>
      {generateDays(props)}
    </div>
  )
}

export default DatePickerWeek
