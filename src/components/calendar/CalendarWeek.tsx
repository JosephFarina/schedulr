import * as React from 'react'

const styles = require('./CalendarWeek.css')

interface Props {

}

const CalendarWeek: React.StatelessComponent<any> = (props: Props) => {
  return (
    <div className={styles.week}>
      <div className={`${styles.day}`}></div>
      <div className={styles.day}></div>
      <div className={styles.day}></div>
      <div className={styles.day}></div>
      <div className={styles.day}></div>
      <div className={styles.day}></div>
      <div className={styles.day}></div>
    </div>
  )
}

export default CalendarWeek
