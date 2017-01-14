import * as M from 'moment'
import * as React from 'react'

const styles = require('./Shared.css')
const ctx = require('classnames')

interface Props {
  isDatePicker?: boolean
  month?: M.Moment
  monthFormat?: string
  onNextRangeClick?(): void
  onPrevRangeClick?(): void
  onCurrRangeClick?(): void
}

const defaultProps: Props = {
  isDatePicker: false,
  month: M(),
  monthFormat: 'MMM',
  onNextRangeClick() { },
  onPrevRangeClick() { },
  onCurrRangeClick() { }
}

const DatePickerHeader: React.StatelessComponent<any> = (props: Props) => {
  const {
    isDatePicker,
    onCurrRangeClick,
    onNextRangeClick,
    onPrevRangeClick,
    month,
    monthFormat,
  } = props

  const dayFormat = isDatePicker ? 'd' : 'ddd'

  const headerClass = ctx({
    [styles.header]: !isDatePicker,
    [styles.headerWidget]: isDatePicker
  })

  const weekClass = ctx({
    [styles.week]: !isDatePicker,
    [styles.weekWidget]: isDatePicker
  })

  const dayClass = ctx({
    [styles.day]: !isDatePicker,
    [styles.dayWidget]: isDatePicker
  })

  return (
    <div className={headerClass} >

      {isDatePicker &&
        <div className={styles.label}>
          <span onClick={onPrevRangeClick}>prev</span>
          <span onClick={onCurrRangeClick}>{month.format(monthFormat)}</span>
          <span onClick={onNextRangeClick}>next</span>
        </div>
      }

      <div className={weekClass}>
        <div className={dayClass}>S</div>
        <div className={dayClass}>M</div>
        <div className={dayClass}>T</div>
        <div className={dayClass}>W</div>
        <div className={dayClass}>T</div>
        <div className={dayClass}>F</div>
        <div className={dayClass}>S</div>
      </div>
    </div>
  )
}

DatePickerHeader.defaultProps = defaultProps

export default DatePickerHeader
