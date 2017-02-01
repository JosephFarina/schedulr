import * as React from 'react'
import { connect } from 'react-redux'

import { RegistrationFields } from 'src/models'
import { handleAuthCredentialChange } from 'src/state/auth/register'
import {
  Input,
  Button
} from 'src/shared/components'

const styles = require('./Register.scss')
const ctx = require('classnames')

interface Props {
  dispatch?: Function
}

interface State {
  orgName?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export class Register extends React.Component<Props, State> {
  static defaultProps: Props = {}
  constructor(props) {
    super(props)
    this.state = {
      orgName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
    this.syncWithStore = this.syncWithStore.bind(this)
  }

  /**
   * 
   * Handle Form Changes
   * 
   */

  handleInputChange(property: RegistrationFields, val: string) {
    this.setState({
      [property]: val
    })
  }

  syncWithStore() {
    const {dispatch} = this.props
    dispatch(handleAuthCredentialChange(this.state))
  }

  /**
   * 
   */

  render() {
    const {
      confirmPassword,
      email,
      orgName,
      password
    } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1>Sign Up</h1>
          <Input
            name="orgName"
            value={orgName}
            onChange={val => this.handleInputChange('orgName', val)}
            onChangeEnd={this.syncWithStore}
            label="Organizations Name" />
          <Input
            name="email"
            value={email}
            onChange={val => this.handleInputChange('email', val)}
            onChangeEnd={this.syncWithStore}
            label="Email" />
          <Input
            name="password"
            type="password"
            value={password}
            onChange={val => this.handleInputChange('password', val)}
            onChangeEnd={this.syncWithStore}
            label="Password" />
          <Input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={val => this.handleInputChange('confirmPassword', val)}
            onChangeEnd={this.syncWithStore}
            label="Confirm Password" />
          <Button block>Submit</Button>
        </div>
        <div className={styles.imageContainer}></div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

export default connect(mapStateToProps)(Register)
