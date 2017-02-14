import * as React from 'react'

import { InputProps } from 'src/models'
const debounce = require('lodash.debounce')

interface State {
  value?: string
}

export const InputControlWrapper = (InputComponent) => class extends React.Component<InputProps, State> {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onChangeEnd = debounce(this.onChangeEnd, 500)
  }

  private onChange(value: string) {
    this.setState({ value })
    this.onChangeEnd()
  }

  public onChangeEnd() {
    const {onChangeEnd} = this.props
    const {value} = this.state
    onChangeEnd(value)
  }

  render() {
    return <InputComponent
      value={this.state.value}
      onChange={this.onChange}
      {...this.props}
    />
  }
}
