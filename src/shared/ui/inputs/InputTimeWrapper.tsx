import * as React from 'react'

import { InputProps } from 'src/models'
import { rangeParser } from 'src/utils'

interface State {
  value?: ''
}

export const InputTimeWrapper = (InputComponent) => class extends React.Component<InputProps, State> {
  constructor(props) {
    super(props)
    this.onChangeEnd = this.onChangeEnd.bind(this)
  }

  private onChangeEnd(val: string) {
    const {onChangeEnd} = this.props
    onChangeEnd(rangeParser(null, val))
  }

  render() {
    return <InputComponent
      {...this.props}
      onChangeEnd={this.onChangeEnd}
    />
  }
}
