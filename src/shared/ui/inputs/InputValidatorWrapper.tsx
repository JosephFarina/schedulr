import * as React from 'react'
import * as ReactTooltip from 'react-tooltip'

const ctx = require('classnames')
const styles = require('./Input.scss')
import { errorArrayToString } from 'src/utils'
import { InputProps } from 'src/models'

interface State {
  focused?: boolean
  touched?: boolean
  value?: ''
}

export const InputValidatorWrapper = (InputComponent) => class extends React.Component<InputProps, State> {
  constructor(props) {
    super(props)
    this.state = {
      focused: false,
      touched: false
    }

    this.handleFocus = this.handleFocus.bind(this)
  }

  private handleFocus() {
    this.setState({ focused: true, touched: true })
  }

  private isValid(): boolean {
    const { touched } = this.state

    return touched && !this.foundInValidateObj()
  }

  private isInvalid(): boolean {
    const { touched } = this.state

    return touched && this.foundInValidateObj()
  }

  private foundInValidateObj(): boolean {
    const { validateObj, name } = this.props
    return (!!validateObj && !!~Object.keys(validateObj).indexOf(name))
  }

  private getErrorMessage(): string | null {
    const {touched} = this.state
    return touched && this.foundInValidateObj() ? errorArrayToString(this.getErrorMessages()) : null
  }

  private getErrorMessages(): string[] | null {
    const { validateObj, name } = this.props
    const {touched} = this.state
    return touched && this.foundInValidateObj() ? validateObj[name] : []
  }

  render() {
    const containerClass = ctx({
      [styles.container]: true,
      [styles.containerWithMessage]: this.isInvalid(),
      [styles.invalid]: this.isInvalid(),
      [styles.valid]: this.isValid()
    })

    return <div className={containerClass}>

      <InputComponent
        {...this.props}
        valid={this.isValid()}
        invalid={this.isInvalid()}
        onFocus={this.handleFocus}
      />

      <div data-tip data-for={`inputMessageFor${name}`} className={styles.message}>{this.getErrorMessage()}</div>
      <ReactTooltip id={`inputMessageFor${name}`} place="bottom" type="error" >
        <ul>{this.getErrorMessages().map((err, i) => <li>{err}</li>)}</ul>
      </ReactTooltip>
    </div>
  }
}
