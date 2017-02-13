import * as React from 'react'

import { SingleDatePicker } from 'react-dates'

class DatePicker extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      focused: false
    }
  }

  render() {
    const {focused} = this.state
    return (
      <SingleDatePicker
        focused={focused}
        onFocusChange={({ focused }) => { this.setState({ focused }) }}
        numberOfMonths={1}
        {...this.props}
      />
    )
  }
}

export { DatePicker }
