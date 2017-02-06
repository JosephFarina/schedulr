import * as React from 'react'
import { connect } from 'react-redux'

import { RegistrationFields, ValidatorResponseObject, RAuthRegister } from 'src/models'
import { handleAuthCredentialChange, authRegisterValidator } from 'src/state/auth/register'
import {
  Input,
  Button
} from 'src/shared/components'

const styles = require('./Register.scss')

interface Props {
  dispatch?: Function
  validatorObj?: ValidatorResponseObject<RAuthRegister>
}

interface State {
  attemptedSubmition?: boolean
  fields?: {
    email?: string
    password?: string
    confirmPassword?: string
    orgName?: string
  }
}

export class Register extends React.Component<Props, State> {
  static defaultProps: Props = {}
  constructor(props) {
    super(props)
    this.state = {
      attemptedSubmition: false,
      fields: {
        orgName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
    }
    this.syncWithStore = this.syncWithStore.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  /**
   * 
   * Handle Form Changes
   * 
   */

  private handleSubmit() {
    this.setState({ attemptedSubmition: true })
  }

  private handleInputChange(property: RegistrationFields, val: string) {
    this.setState(prevState => ({
      fields: Object.assign({}, prevState.fields, { [property]: val })
    }))
  }

  private syncWithStore() {
    const {dispatch} = this.props
    dispatch(handleAuthCredentialChange(this.state.fields))
  }

  public render() {
    const {validatorObj} = this.props
    const {attemptedSubmition} = this.state
    const inputFields: { label: string, type: 'text' | 'password', value: RegistrationFields }[] = [
      {
        label: 'Organizations Name',
        value: 'orgName',
        type: 'text'
      },
      {
        label: 'Email',
        value: 'email',
        type: 'text'
      },
      {
        label: 'Password',
        value: 'password',
        type: 'password'
      },
      {
        label: 'Confirm Password',
        value: 'confirmPassword',
        type: 'password'
      }
    ]

    return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1>Sign Up</h1>
          {inputFields.map((field, i) => <Input
            key={i}
            type={field.type}
            name={field.value}
            validateObj={validatorObj}
            value={this.state.fields[field.value]}
            displayErrors={attemptedSubmition}
            onChange={val => this.handleInputChange(field.value, val)}
            onChangeEnd={this.syncWithStore}
            label={field.label} />)}
          <Button onClick={this.handleSubmit} block>Submit</Button>
        </div>
        <div className={styles.imageContainer}></div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps): Props => {
  return {
    validatorObj: authRegisterValidator(state)
  }
}

export default connect(mapStateToProps)(Register)
