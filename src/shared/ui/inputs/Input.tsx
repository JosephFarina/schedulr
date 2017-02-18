// FIXME: Chrome autofill does not tigger event to raise label on type="password"

import * as React from 'react'

import { InputProps } from 'src/models'

import { Input } from 'antd'

const styles = require('./Input.scss')
const ctx = require('classnames')

export interface Props extends InputProps { }

export interface State {
  focused?: boolean
}

class UncontrolledInput extends React.Component<Props, State> {
  public static defaultProps: Props = {
    label: '',
    value: '',
    valid: null,
    type: 'text',
    name: '',
    message: '',
    validateObj: null,
    displayErrors: false,
    onBlur: () => { },
    onFocus: () => { },
    onChange: () => { },
    onChangeEnd: () => { }
  }
  public textInput: HTMLInputElement

  constructor(props: Props) {
    super(props)
    this.state = {
      focused: false
    }

    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  public focus(): void {
    this.setState({ focused: true })
    this.textInput.focus()
  }

  public blur(): void {
    this.setState({ focused: false })
    this.textInput.blur()
  }

  private onFocus(): void {
    this.setState({ focused: true })
    this.props.onFocus()
  }

  private onBlur(): void {
    this.setState({ focused: false })
    this.props.onBlur()
  }

  private hasValue(): boolean {
    const { value } = this.props
    return value && (value as any[]).length > 0 || false
  }

  public render() {
    const { focused } = this.state
    const {
      label,
      value,
      children,
      type,
      name,
      onChange
    } = this.props


    return (
      <Input
        size="large"
        {...this.props}

      />
    )
  }
}

export default UncontrolledInput
