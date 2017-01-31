import * as React from 'react'

const styles = require('./Auth.css')
const ctx = require('classnames')

import Login from 'src/routes/auth/containers/Login'

interface Props {
  children?: any
}

const Auth: React.StatelessComponent<Props> = ({children}: Props) => {
  const klass = ctx({
    [styles.container]: true
  })

  return (
    <div className={klass}>
      {children}
    </div>
  )
}

export default Auth
