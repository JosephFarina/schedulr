// FIXME: Chrome autofill does not tigger event to raise label on type="password"

import * as React from 'react'
const debounce = require('lodash.debounce')

import { InputProps } from 'src/models'

const styles = require('./Input.scss')
const ctx = require('classnames')

export interface Props extends InputProps { }

export interface State {
  focused?: boolean
  touched?: boolean
}

export class Input extends React.Component<Props, State> {
  public static defaultProps: Props = {
    label: '',
    value: '',
    valid: null,
    type: 'text',
    name: '',
    message: '',
    validateObj: null,
    onBlur: () => { },
    onFocus: () => { },
    onChange: () => { },
    onChangeEnd: () => { }
  }
  public textInput: HTMLInputElement

  constructor(props: Props) {
    super(props)
    this.state = {
      focused: false,
      touched: false
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
    this.setState({ focused: true, touched: true })
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

  private isValid(): boolean {
    const { valid } = this.props
    const { touched } = this.state

    return touched && (valid === true)
  }

  private isInvalid(): boolean {
    const { valid, validateObj, name } = this.props
    const { touched } = this.state

    return touched && (valid === false || !!this.getErrorMessage())
  }

  // TODO: have it display error when told to display errors and show green when is valid and touched
  private getErrorMessage(): string | null {
    const { valid, validateObj, name } = this.props

    return !!validateObj && !!~Object.keys(validateObj).indexOf(name) ? validateObj[name][0] : null
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
      type,
      name
    } = this.props

    const {
      focused,
      touched
    } = this.state

    const containerClass = ctx({
      [styles.container]: true,
      [styles.containerWithMessage]: message && message.length > 0
    })

    const labelClass = ctx({
      [styles.label]: true,
      [styles.labelActive]: focused || this.hasValue(),
      [styles.redColor]: this.isInvalid(),
      [styles.greenColor]: this.isValid()
    })

    const messageClass = ctx({
      [styles.message]: true,
      [styles.redColor]: this.isInvalid(),
      [styles.greenColor]: this.isValid()
    })

    const barClass = ctx({
      [styles.bar]: true,
      [styles.redBackground]: this.isInvalid(),
      [styles.greenBackground]: this.isValid()
    })

    return (
      <div className={containerClass}>
        <input
          className={styles.inputText}
          name={name}
          value={value}
          type={type}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onChange={this.onChange}
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
