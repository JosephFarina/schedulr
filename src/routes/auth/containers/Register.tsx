import * as React from 'react'
import { connect } from 'react-redux'

import { } from 'src/models'
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
  confirmPassowrd?: string
}

declare type RegistrationFields = 'orgName' | 'email' | 'password' | 'confirmPassowrd'

class Register extends React.Component<Props, State> {
  static defaultProps: Props = {}
  constructor(props) {
    super(props)
    this.state = {
      orgName: '',
      email: '',
      password: '',
      confirmPassowrd: ''
    }
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

  /**
   * 
   */

  render() {
    const {
      confirmPassowrd,
      email,
      orgName,
      password
    } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1>Sign Up</h1>
          <Input
            value={orgName}
            onChange={val => this.handleInputChange('orgName', val)}
            label="Organizations Name" />
          <Input
            value={email}
            onChange={val => this.handleInputChange('email', val)}
            label="Email" />
          <Input
            type="password"
            value={password}
            onChange={val => this.handleInputChange('password', val)}
            label="Password" />
          <Input
            type="password"
            value={confirmPassowrd}
            onChange={val => this.handleInputChange('confirmPassowrd', val)}
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
