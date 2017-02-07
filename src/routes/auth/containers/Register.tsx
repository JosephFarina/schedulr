import * as React from 'react'
import { connect } from 'react-redux'

import {
  RegistrationFields,
  ValidatorResponseObject,
  RAuthRegister,
} from 'src/models'

import {
  handleRegistrationCredentialChange,
  authRegisterValidator,
  requestRegistration,
  getAuthRegister
} from 'src/state/auth/register'

import {
  Input,
  Button
} from 'src/shared/components'

const styles = require('./Register.scss')

interface Props {
  dispatch?: Function
  validatorObj?: ValidatorResponseObject<RAuthRegister>
  registration?: RAuthRegister
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
    const {validatorObj, dispatch} = this.props
    this.setState({ attemptedSubmition: true })
    if (validatorObj === null) {
      dispatch(requestRegistration())
    }
  }

  private handleInputChange(property: RegistrationFields, val: string) {
    this.setState(prevState => ({
      fields: Object.assign({}, prevState.fields, { [property]: val })
    }))
  }

  private syncWithStore() {
    const {dispatch} = this.props
    dispatch(handleRegistrationCredentialChange(this.state.fields))
  }

  public render() {
    const {validatorObj, registration} = this.props
    const {fetching } = registration
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
          <form onSubmit={e => { e.preventDefault() }}>
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
            <Button loading={fetching} role="submit" onClick={this.handleSubmit} block>Submit</Button>
          </form>
        </div>
        <div className={styles.imageContainer}></div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps): Props => {
  return {
    validatorObj: authRegisterValidator(state),
    registration: getAuthRegister(state)
  }
}

export default connect(mapStateToProps)(Register)
