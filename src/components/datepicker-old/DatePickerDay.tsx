// import * as React from 'react'

// const styles = require('./DatePickerDay.css')

// import * as Models from './../../models'
// import { isSameMonth } from './../../utils/momentHelpers.util'
// import * as TimeFormatter from './../../utils/timeFormatter.utils'

// interface Props extends Models.DateOnly {
//   month: number
// }

// const generateStyle = (props: Props): string => {
//   const inMonth = !isSameMonth(props.date, props.month) ? styles.notInMonth : ''
//   return `${styles.day} ${inMonth}`
// }

// const DatePickerDay: React.StatelessComponent<any> = (props: Props) => {
//   const { date, month } = props

//   return (
//     <div className={generateStyle(props)}>
//       {TimeFormatter.getDayOfMonth(date)}
//     </div>
//   )
// }

// export default DatePickerDay
