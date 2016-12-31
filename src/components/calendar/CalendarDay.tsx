import * as M from 'moment'
import * as React from 'react'

import * as I from './../../models'

const styles = require('./Shared.css')
const ctx = require('classnames')

interface Props {
  day: M.Moment
  month: M.Moment
  isDatePicker?: boolean
  shifts?: I.Shift[]

  onDayClick?(date: M.Moment): void
  onShiftClick?(shift: I.Shift): void
}

const defaultProps: Props = {
  day: M(),
  month: M(),
  isDatePicker: false,
  shifts: null,

  onDayClick() { },
  onShiftClick() { }
}

const CalendarDay: React.StatelessComponent<Props> = (props: Props) => {
  const {
    day,
    month,
    isDatePicker,
    shifts,
    onDayClick,
    onShiftClick
  } = props

  const className = ctx({
    [styles.day]: !isDatePicker,
    [styles.dayWidget]: isDatePicker
  })

  return (
    <div onClick={() => onDayClick(day)} className={className}>
      {isDatePicker && day.format('D')}
      {!isDatePicker && <div className={styles.dayInfo}>{day.format('D')}</div> }
      {shifts && shifts.map(shift => <div>{shift.duration}</div>)}
    </div>
  )
}

CalendarDay.defaultProps = defaultProps

export default CalendarDay
