import * as React from 'react'
import { connect } from 'react-redux'

import { RState } from 'src/models'
import {
  handleAuthCredentialChange,
  getAuthLoginIsFetching,
  requestLogin
} from 'src/state/auth/login'


const styles = require('./Login.css')
const ctx = require('classnames')

import {
  Button,
  Input,
} from 'src/shared/components'

interface Props {
  dispatch?: Function
  isFetching?: boolean
}

interface State {
  email?: string
  password?: string
}

export class Login extends React.Component<Props, State>  {
  static defaultProps: Props = {
    isFetching: false
  }

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.syncWithStore = this.syncWithStore.bind(this)
    this.requestLogin = this.requestLogin.bind(this)
  }

  handleEmailChange(email) {
    this.setState({ email })
  }

  handlePasswordChange(password) {
    this.setState({ password })
  }

  /**
   *
   *  Dispatches the requestLogin action
   * 
   */

  requestLogin() {
    const { dispatch } = this.props
    dispatch(requestLogin())
  }

  /**
   * 
   * #syncWithStore()
   * Updates the redux store with the components state's email and password
   * when ever the input onChangeEnd is fired
   * 
   */

  syncWithStore() {
    const {email, password} = this.state
    const {dispatch} = this.props
    dispatch(handleAuthCredentialChange(email, password))
  }

  render() {
    const { isFetching } = this.props
    const { email, password } = this.state
    const klass = ctx({
      [styles.container]: true
    })

    return (
      <div className={klass}>
        <div className={styles.imageContainer}>
          <h3><strong>LOGO</strong></h3>
        </div>
        <div>
          <Input
            name="email"
            label="Email"
            onChangeEnd={this.syncWithStore}
            onChange={this.handleEmailChange}
            value={email}></Input>
          <Input
            name="password"
            type="password"
            onChangeEnd={this.syncWithStore}
            label="Password"
            onChange={this.handlePasswordChange}
            value={password}></Input>
          <Button
            block
            loading={isFetching}
            onClick={this.requestLogin}
            >Login</Button >
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state: RState, ownProps: Props): Props => {
  return {
    isFetching: getAuthLoginIsFetching(state)
  }
}

export default connect(mapStateToProps)(Login)
