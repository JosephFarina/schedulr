import * as React from 'react'

const styles = require('./DatePickerDay.css')

import * as Models from './../../models'
import * as TimeFormatter from './../../utils/timeFormatter.utils'

interface Props extends Models.Day { }

const DatePickerDay: React.StatelessComponent<any> = (props: Props) => {
  return (
    <div className={styles.day}>
      {TimeFormatter.getDayOfMonth(props.date)}
    </div>
  )
}

export default DatePickerDay
