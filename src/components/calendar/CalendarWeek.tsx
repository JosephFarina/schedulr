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
  firstDaySelectable?: M.Moment
  shifts?: I.ShiftTemplate[]
  isSelected?: boolean
  selectedDay?: M.Moment
  onDayClick?(date: M.Moment): void
  onWeekClick?(week: M.Moment): void
  onShiftClick?(shift: I.ShiftTemplate): void
}

const defaultProps: Props = {
  week: M(),
  month: M(),
  firstDaySelectable: null,
  selectedDay: null,
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
    selectedDay,
    onWeekClick,
    onShiftClick,
    firstDaySelectable,
    isSelected
  } = props


  const className = ctx({
    [styles.week]: !isDatePicker,
    [styles.weekWidget]: isDatePicker,
    [styles.weekSelected]: isSelected
  })


  return (
    <div onClick={() => onWeekClick(week)} className={className}>
      {getDaysFromWeek(week).map((day, i) => {
        return <CalendarDay
          day={day}
          firstDaySelectable={firstDaySelectable}
          isSelectedDay={day.isSame(selectedDay, 'day')}
          isDatePicker={isDatePicker}
          key={i}
          outOfRange={!month.isSame(day, 'month')}
          shifts={!isDatePicker && getShiftsByDay(day, shifts)}
          month={month}
          onDayClick={onDayClick}
          onShiftClick={onShiftClick}
          />
      })}
    </div>
  )
}

CalendarWeek.defaultProps = defaultProps

export default CalendarWeek
