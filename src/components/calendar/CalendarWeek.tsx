import * as M from 'moment'
import * as React from 'react'

import * as I from './../../models'
import { getDaysFromWeek } from './../../utils/getDaysFromWeek.util'

import { getShiftsByDay } from './../../state/shifts/selector'

import CalendarDay from './CalendarDay'

const styles = require('./Shared.css')
const ctx = require('classnames')

interface Props {
  month: M.Moment
  week: M.Moment
  isDatePicker?: boolean
  shifts?: I.Shifts

  onDayClick?(date: M.Moment): void
  onWeekClick?(week: M.Moment): void
  onShiftClick?(shift: I.Shift): void
}

const defaultProps: Props = {
  week: M(),
  month: M(),
  isDatePicker: false,
  shifts: null,

  onDayClick() { },
  onWeekClick() { },
  onShiftClick() { }
}

const CalendarWeek: React.StatelessComponent<Props> = (props: Props) => {
  const {
    week,
    month,
    isDatePicker,
    shifts,
    onDayClick,
    onWeekClick,
    onShiftClick
  } = props

  return (
    <div onClick={() => onWeekClick(week)} className={styles.week}>
      {getDaysFromWeek(week).map((day, i) => <CalendarDay
        day={day}
        isDatePicker={isDatePicker}
        key={i}
        shifts={getShiftsByDay(day, shifts)}
        month={month}
        onDayClick={onDayClick}
        onShiftClick={onShiftClick}
        />)}
    </div>
  )
}

CalendarWeek.defaultProps = defaultProps

export default CalendarWeek
