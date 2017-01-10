import * as M from 'moment'
import * as React from 'react'

import * as I from 'src/models'

import CalendarHeader from './CalendarHeader'
import CalendarMonth from './CalendarMonth'
import CalendarWeek from './CalendarWeek'

const styles = require('./Shared.css')
const ctx = require('classnames')

interface Props {
  month?: M.Moment
  week?: M.Moment
  selectedDay?: M.Moment
  isDatePicker?: boolean
  firstDaySelectable?: M.Moment
  shifts?: I.Shift[]
  selectedWeek?: M.Moment
  onDayClick?(date: M.Moment): void
  onWeekClick?(week: M.Moment): void
  onShiftClick?(shift: I.Shift): void
  onNextRangeClick?(): void
  onPrevRangeClick?(): void
  onCurrRangeClick?(): void
}

const defaultProps: Props = {
  month: M(),
  week: null,
  selectedDay: null,
  selectedWeek: null,
  isDatePicker: false,
  firstDaySelectable: null,
  shifts: null,
  onDayClick() { },
  onWeekClick() { },
  onShiftClick() { },
  onNextRangeClick() { },
  onPrevRangeClick() { },
  onCurrRangeClick() { }
}

const Calendar: React.StatelessComponent<Props> = (props: Props) => {
  const {
    month,
    week,
    selectedDay,
    isDatePicker,
    shifts,
    onDayClick,
    onWeekClick,
    selectedWeek,
    onShiftClick,
    firstDaySelectable,
    onCurrRangeClick,
    onNextRangeClick,
    onPrevRangeClick
  } = props

  const containerClass = ctx({
    [styles.container]: !isDatePicker,
    [styles.containerWidget]: isDatePicker
  })

  return (
    <div className={containerClass}>
      <CalendarHeader
        isDatePicker={isDatePicker}
        month={month}
        onCurrRangeClick={onCurrRangeClick}
        onNextRangeClick={onNextRangeClick}
        onPrevRangeClick={onPrevRangeClick}
        />

      {week && <CalendarWeek
        month={month}
        week={week}
        selectedDay={selectedDay}
        isDatePicker={isDatePicker}
        firstDaySelectable={firstDaySelectable}
        shifts={shifts}
        onDayClick={onDayClick}
        onWeekClick={onWeekClick}
        onShiftClick={onShiftClick}
        />}

      {month && !week && <CalendarMonth
        month={month}
        selectedDay={selectedDay}
        isDatePicker={isDatePicker}
        firstDaySelectable={firstDaySelectable}
        shifts={shifts}
        onDayClick={onDayClick}
        selectedWeek={selectedWeek}
        onWeekClick={onWeekClick}
        onShiftClick={onShiftClick}
        />}
    </div>
  )
}

Calendar.defaultProps = defaultProps

export default Calendar
