import * as M from 'moment'
import * as React from 'react'

import * as I from 'src/models'
import { getDaysFromWeek } from 'src/utils'

import {
  getShiftsByDay
} from './../../state/shift'

import CalendarDay from './CalendarDay'

const styles = require('./Shared.css')
const ctx = require('classnames')

interface Props {
  month?: M.Moment
  week?: M.Moment
  isDatePicker?: boolean
  shifts?: I.Shift[]
  isSelected?: boolean
  onDayClick?(date: M.Moment): void
  onWeekClick?(week: M.Moment): void
  onShiftClick?(shift: I.Shift): void
}

const defaultProps: Props = {
  week: M(),
  month: M(),
  isDatePicker: false,
  shifts: null,
  isSelected: false,
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
    onShiftClick,
    isSelected
  } = props

  const className = ctx({
    [styles.week]: !isDatePicker,
    [styles.weekWidget]: isDatePicker,
    [styles.weekSelected]: isSelected
  })

  return (
    <div onClick={() => onWeekClick(week)} className={className}>
      {getDaysFromWeek(week).map((day, i) => <CalendarDay
        day={day}
        isDatePicker={isDatePicker}
        key={i}
        outOfRange={!month.isSame(day, 'month')}
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
