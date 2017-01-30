import * as React from 'react'

import { Link } from 'react-router'

import { Loading } from 'src/shared/components'

const styles = require('./Button.css')
const ctx = require('classnames')

interface Props {
  children?: React.ReactChild
  onClick?: any
  disabled?: boolean
  loading?: boolean
  block?: boolean
  mini?: boolean
  active?: boolean
  to?: string
}

const defaultProps: Props = {
  onClick: () => { },
  block: false,
  mini: false,
  active: false,
  loading: false
}

const Button: React.StatelessComponent<any> = (props: Props) => {
  const {
    children,
    onClick,
    block,
    mini,
    active,
    to,
    loading,
    disabled
  } = props

  const className = ctx({
    [styles.base]: true,
    [styles.block]: block,
    [styles.mini]: mini,
    [styles['base--active']]: active,
    [styles.loading]: loading
  })

  const child = loading ? <Loading /> : children
  const link = to ? <Link to={to}>{child}</Link> : child
  const isDisabled = disabled || loading

  return (
    <button disabled={isDisabled} onClick={onClick} className={className}>
      {link}
    </button>
  )
}

Button.defaultProps = defaultProps

export { Button }
