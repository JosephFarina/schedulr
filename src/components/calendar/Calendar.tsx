import * as React from 'react'

import CalendarContent from './CalendarContent'
import CalendarHeader from './CalendarHeader'
import CalendarWeek from './CalendarWeek'

const styles = require('./Calendar.css')

interface Props {

}

interface State {

}

class Calendar extends React.Component<Props, State> {
  public static proptypes = {

  }

  public render() {
    return (
      <div className={styles.container}>
        <CalendarHeader></CalendarHeader>
        <CalendarContent>
          <CalendarWeek></CalendarWeek>
          <CalendarWeek></CalendarWeek>
          <CalendarWeek></CalendarWeek>
          <CalendarWeek></CalendarWeek>
        </CalendarContent>
      </div>
    )
  }
}

export default Calendar
