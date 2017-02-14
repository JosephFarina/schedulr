import * as React from 'react'

import { InputProps } from 'src/models'
import { SingleDatePicker } from 'react-dates'
import { InputValidatorWrapper } from './InputValidatorWrapper'

class UnwrappedDatePicker extends React.Component<InputProps, any> {
  constructor(props) {
    super(props)
    this.state = {
      focused: false
    }
  }

  render() {
    const {focused} = this.state
    const {onFocus} = this.props
    return (
      <SingleDatePicker
        focused={focused}
        onFocusChange={({ focused }) => {
          this.setState({ focused })
          onFocus()
        }}
        numberOfMonths={1}
        {...this.props}
      />
    )
  }
}

const DatePicker = InputValidatorWrapper(UnwrappedDatePicker)

export { DatePicker }
