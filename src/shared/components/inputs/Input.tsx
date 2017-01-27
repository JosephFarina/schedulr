// FIXME: Chrome autofill does not tigger event to raise label on type="password"

import * as React from 'react'
const debounce = require('lodash.debounce')

import { InputProps } from 'src/models'

const styles = require('./Input.css')
const ctx = require('classnames')

interface Props extends InputProps { }

interface State {
  focused: boolean
}

export class Input extends React.Component<Props, State> {
  public static defaultProps: Props = {
    label: '',
    value: '',
    valid: null,
    type: 'text',
    message: '',
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
    this.onChange = this.onChange.bind(this)
    this.onChangeEnd = debounce(this.onChangeEnd, 500)
  }

  /**
   * 
   * Public API that can be used by ref
   * 
   */

  public focus(): void {
    this.textInput.focus()
  }

  public blur(): void {
    this.textInput.blur()
  }

  /**
   * 
   * Event Handler
   * 
   */

  private onChange(event: any): void {
    this.props.onChange(event.target.value)
    this.onChangeEnd()
  }

  // debounced function calls props.onChangeEnd on typing break
  private onChangeEnd(): void {
    const { onChangeEnd } = this.props
    onChangeEnd()
  }

  private onFocus(): void {
    this.setState({ focused: true })
    this.props.onFocus()
  }

  private onBlur(): void {
    this.setState({ focused: false })
    this.props.onBlur()
  }

  /**
   * 
   * Helpers
   * 
   */

  private hasValue(): boolean {
    const { value } = this.props
    return value && value.length > 0 || false
  }

  /**
   * 
   * Renderers
   * 
   */

  public render() {
    const {
      label,
      value,
      children,
      message,
      valid,
      type
    } = this.props

    const {
      focused
    } = this.state

    const containerClass = ctx({
      [styles.container]: true,
      [styles.containerWithMessage]: message && message.length > 0
    })

    const labelClass = ctx({
      [styles.label]: true,
      [styles.labelActive]: focused || this.hasValue(),
      [styles.redColor]: valid === false,
      [styles.greenColor]: valid === true
    })

    const messageClass = ctx({
      [styles.message]: true,
      [styles.redColor]: valid === false,
      [styles.greenColor]: valid === true
    })

    const barClass = ctx({
      [styles.bar]: true,
      [styles.redBackground]: valid === false,
      [styles.greenBackground]: valid === true
    })

    return (
      <div className={containerClass}>
        <input
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          value={value}
          onChange={this.onChange}
          className={styles.inputText}
          type={type}
          ref={input => { this.textInput = input } } />

        <label className={labelClass}>{label}</label>
        <div className={barClass}></div>
        <div className={messageClass}>{message}</div>
        {children}
      </div>
    )
  }
}

export default Input
