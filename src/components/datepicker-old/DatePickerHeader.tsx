import * as React from 'react'

import * as TimeFormatter from './../../utils/timeFormatter.utils'

const styles = require('./DatePickerHeader.css')

interface Props {
  nextRange: any,
  prevRange: any,
  month: number
}

const DatePickerHeader: React.StatelessComponent<any> = (props: Props) => {
  return (
    <div>
      <div className={styles.label}>
        <span onClick={props.prevRange}>prev</span>
        <span>{ TimeFormatter.monthFromNumber(props.month)}</span>
        <span onClick={props.nextRange}>next</span>
      </div>
      <div className={styles.week}>
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

export default DatePickerHeader
