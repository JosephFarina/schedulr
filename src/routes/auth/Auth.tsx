import * as React from 'react'

const styles = require('./Auth.css')
const ctx = require('classnames')

import AuthContainer from 'src/routes/auth/containers/AuthContainer'

interface Props { }

const Auth: React.StatelessComponent<Props> = (props: Props) => {
  const klass = ctx({
    [styles.container]: true
  })

  return (
    <div className={klass}>
      <AuthContainer>Log me in</AuthContainer>
    </div>
  )
}

export default Auth
