import * as M from 'moment'
import * as React from 'react'

import * as I from './../../models'

import CalendarHeader from './CalendarHeader'
import CalendarMonth from './CalendarMonth'
import CalendarWeek from './CalendarWeek'

interface Props {
  month?: M.Moment
  week?: M.Moment
  isDatePicker?: boolean
  shifts?: I.Shifts
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
  isDatePicker: false,
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
    isDatePicker,
    shifts,
    onDayClick,
    onWeekClick,
    onShiftClick,
    onCurrRangeClick,
    onNextRangeClick,
    onPrevRangeClick
  } = props

  return (
    <div>
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
        isDatePicker={isDatePicker}
        shifts={shifts}
        onDayClick={onDayClick}
        onWeekClick={onWeekClick}
        onShiftClick={onShiftClick}
        />}

      {month && !week && <CalendarMonth
        month={month}
        isDatePicker={isDatePicker}
        shifts={shifts}
        onDayClick={onDayClick}
        onWeekClick={onWeekClick}
        onShiftClick={onShiftClick}
        />}
    </div>
  )
}

Calendar.defaultProps = defaultProps

export default Calendar
