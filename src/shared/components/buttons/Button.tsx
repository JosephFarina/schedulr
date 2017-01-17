import * as React from 'react'

import { Link } from 'react-router'

const styles = require('./Button.css')
const ctx = require('classnames')

interface Props {
  children?: React.ReactChild
  onClick?: any
  block?: boolean
  mini?: boolean
  active?: boolean
  to?: string
}

const defaultProps: Props = {
  onClick: () => { },
  block: false,
  mini: false,
  active: false
}

const Button: React.StatelessComponent<any> = (props: Props) => {
  const {
    children,
    onClick,
    block,
    mini,
    active,
    to
  } = props

  const className = ctx({
    [styles.base]: true,
    [styles.block]: block,
    [styles.mini]: mini,
    [styles['base--active']]: active
  })

  return to ?
    (
      <button onClick={onClick} className={className}>
        <Link to={to}>{children}</Link>
      </button>
    )
    : (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    )
}

Button.defaultProps = defaultProps

export { Button }
