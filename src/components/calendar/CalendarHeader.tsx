import * as M from 'moment'
import * as React from 'react'

import * as TimeFormatter from './../../utils/timeFormatter.utils'

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
  monthFormat: 'MM',
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

  return (
    <div className={headerClass} >

      {isDatePicker &&
        <div className={styles.label}>
          <span onClick={onPrevRangeClick}>prev</span>
          <span>{month.format(monthFormat)}</span>
          <span onClick={onNextRangeClick}>next</span>
        </div>
      }

      <div className={weekClass}>
        <div className={styles.day}>S</div>
        <div className={styles.day}>M</div>
        <div className={styles.day}>T</div>
        <div className={styles.day}>W</div>
        <div className={styles.day}>T</div>
        <div className={styles.day}>F</div>
        <div className={styles.day}>S</div>
      </div>
    </div>
  )
}

DatePickerHeader.defaultProps = defaultProps

export default DatePickerHeader
