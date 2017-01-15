import * as M from 'moment'
import * as React from 'react'

import * as I from 'src/models'

import ShiftTemplate from './Shift'

const styles = require('./Shared.css')
const ctx = require('classnames')

interface Props {
  day: M.Moment
  month: M.Moment
  isDatePicker?: boolean
  isSelectedDay?: boolean
  firstDaySelectable?: M.Moment
  shifts?: I.Shift[]
  outOfRange?: boolean
  onDayClick?(date: M.Moment): void
  onShiftClick?(shift: I.ShiftTemplate): void
}

const defaultProps: Props = {
  day: M(),
  month: M(),
  isDatePicker: false,
  firstDaySelectable: null,
  shifts: null,
  isSelectedDay: false,
  outOfRange: false,
  onDayClick() { },
  onShiftClick() { }
}

const CalendarDay: React.StatelessComponent<Props> = (props: Props) => {
  const {
    day,
    month,
    isDatePicker,
    firstDaySelectable,
    shifts,
    onDayClick,
    onShiftClick,
    outOfRange,
    isSelectedDay
  } = props


  const className = ctx({
    [styles.day]: !isDatePicker,
    [styles.dayWidget]: isDatePicker,
    [styles.outsideMonth]: outOfRange && isDatePicker,
    [styles.daySelected]: isDatePicker && isSelectedDay,
    [styles.dayCanBeSelected]: isDatePicker,
    [styles.dayIsDisabled]: day.isBefore(firstDaySelectable, 'day')
  })

  // console.log(shifts && shifts.map(shift => shift.startTime))

  return (
    <div onClick={() => handleClick(props)} className={className}>
      {isDatePicker && day.format('D')}
      {!isDatePicker && <div className={styles.dayInfo}>{day.format('dd/D')}</div>}
      {shifts && shifts.map((shift, i) => {

        return <div key={i}>
          {shift &&
            <div style={{ borderBottom: '1px solid' }}>{`${JSON.stringify(shift)}`}</div>
          }
        </div>
      })}

    </div>
  )
}

function handleClick(props: Props) {
  const { onDayClick, day, firstDaySelectable} = props
  if (firstDaySelectable && day.isSameOrAfter(firstDaySelectable, 'day')) {
    onDayClick(day)
  } else if (!firstDaySelectable) {
    onDayClick(day)
  }
}

CalendarDay.defaultProps = defaultProps


export default CalendarDay
