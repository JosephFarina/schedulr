import * as React from 'react'
import { connect } from 'react-redux'

import { RState } from 'src/models'

const styles = require('./AuthContainer.css')
const ctx = require('classnames')

import {
  Button,
  Input,
} from 'src/shared/components'

interface Props {

}

interface State {
  email?: string
  password?: string
}

class AuthContainer extends React.Component<Props, State>  {
  static defaultProps: Props = {

  }

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  handleEmailChange(email) {
    this.setState({ email })
  }

  handlePasswordChange(password) {
    this.setState({ password })
  }

  render() {
    const {email, password} = this.state
    const klass = ctx({
      [styles.container]: true
    })

    return (
      <div className={klass}>
        <div className={styles.imageContainer}>
          <h3><strong>LOGO</strong></h3>
        </div>
        <div>
          <Input label="Email" onChange={this.handleEmailChange} value={email}></Input>
          <Input type="password" label="Password" onChange={this.handlePasswordChange} value={password}></Input>
          <Button block loading></Button >
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state: RState, ownProps: Props) => {
  return {}
}

export default connect(mapStateToProps)(AuthContainer)
