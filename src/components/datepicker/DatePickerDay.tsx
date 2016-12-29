import * as React from 'react'

const styles = require('./DatePickerDay.css')

import * as Models from './../../models'
import * as TimeFormatter from './../../utils/timeFormatter.utils'

interface Props extends Models.Day {
}

const DatePickerDay: React.StatelessComponent<any> = ({ date }: Props) => {
  return (
    <div className={styles.day}>
      {TimeFormatter.getDayOfMonth(date)}
    </div>
  )
}

export default DatePickerDay
