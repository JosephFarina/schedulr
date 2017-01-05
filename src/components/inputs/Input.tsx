import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { InputProps } from './models'

const styles = require('./Input.css')
const ctx = require('classnames')

interface Props extends InputProps { }

interface State {
  focused: boolean
}

class Input extends React.Component<Props, State> {
  public static defaultProps = {
    label: '',
    value: '',
    onBlur: () => { },
    onFocus: () => { },
    onChange: () => { }
  }
  public textInput: HTMLInputElement

  constructor(props: Props) {
    super(props)
    this.state = {
      focused: false
    }

    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  public onChange(event: any): void {
    this.props.onChange(event.target.value)
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
    return value && value.length > 0 || false
  }

  public focus(): void {
    this.textInput.focus()
  }

  public blur(): void {
    this.textInput.blur()
  }

  public render() {
    const {
      label,
      value,
      children
    } = this.props

    const {
      focused
    } = this.state

    const labelClass = ctx({
      [styles.label]: true,
      [styles.labelActive]: focused || this.hasValue()
    })

    return (
      <div className={styles.container}>
        <input
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          value={value}
          onChange={this.onChange}

          className={styles.inputText}
          type="text"
          ref={input => { this.textInput = input } } />

        <label className={labelClass}>{label}</label>
        <div className={styles.bar}></div>
        {children}
      </div>
    )
  }
}

export default Input
