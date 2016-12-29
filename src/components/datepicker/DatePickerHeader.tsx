import * as React from 'react'

const styles = require('./DatePickerHeader.css')

interface Props {

}

const DatePickerHeader: React.StatelessComponent<any> = (props: Props) => {
  return (
      <div className={styles.label}>
      <div className={styles.day}>S</div>
      <div className={styles.day}>M</div>
      <div className={styles.day}>T</div>
      <div className={styles.day}>W</div>
      <div className={styles.day}>T</div>
      <div className={styles.day}>F</div>
      <div className={styles.day}>S</div>
    </div>
  )
}

export default DatePickerHeader
