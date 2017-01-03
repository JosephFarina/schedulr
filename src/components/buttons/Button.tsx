import * as React from 'react'

const styles = require('./Button.css')
const ctx = require('classnames')

interface Props {
  children?: React.ReactChild
  onClick?: any
  block?: boolean
  mini?: boolean
  active?: boolean
}

const defaultProps: Props = {
  onClick: () => {},
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
    active
  } = props

  const className = ctx({
    [styles.base]: true,
    [styles.block]: block,
    [styles.mini]: mini,
    [styles['base--active']]: active
  })

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )
}

Button.defaultProps = defaultProps

export default Button
