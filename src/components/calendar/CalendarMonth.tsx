import * as M from 'moment'
import * as React from 'react'

import * as I from 'src/models'
import { getWeeksFromMonth } from 'src/utils/getWeeksFromMonth.util'

import CalendarWeek from './CalendarWeek'

const styles = require('./Shared.css')
const ctx = require('classnames')

interface Props {
  month?: M.Moment
  isDatePicker?: boolean
  selectedWeek?: M.Moment
  shifts?: I.Shift[]
  onDayClick?(date: M.Moment): void
  onWeekClick?(week: M.Moment): void
  onShiftClick?(shift: I.Shift): void
}

const defaultProps: Props = {
  month: M(),
  selectedWeek: null,
  isDatePicker: false,
  shifts: null,
  onDayClick() { },
  onWeekClick() { },
  onShiftClick() { }
}

const CalendarMonth: React.StatelessComponent<Props> = (props: Props) => {
  const {
    month,
    onDayClick,
    onWeekClick,
    onShiftClick,
    shifts,
    selectedWeek,
    isDatePicker
  } = props


  return (
    <div className={styles.month} >
      {getWeeksFromMonth(month).map((week, i) => <CalendarWeek
        onDayClick={onDayClick}
        onWeekClick={onWeekClick}
        onShiftClick={onShiftClick}
        shifts={shifts}
        isSelected={week.isSame(selectedWeek, 'week')}
        isDatePicker={isDatePicker}
        key={i}
        month={month}
        week={week}
        />)}
    </div>
  )
}

CalendarMonth.defaultProps = defaultProps

export default CalendarMonth
