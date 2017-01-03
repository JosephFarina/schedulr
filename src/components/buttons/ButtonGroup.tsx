import * as React from 'react'

const styles = require('./ButtonGroup.css')

const ctx = require('classnames')

interface Props {
  children?: React.ReactChild
  buttonBar?: boolean
  justified?: boolean
  centered?: boolean
  block?: boolean
}

const defaultProps: Props = {
  buttonBar: false,
  justified: false,
  block: false,
  centered: false
}

const ButtonGroup: React.StatelessComponent<any> = (props: Props) => {
  const {
    children,
    buttonBar,
    justified,
    centered,
    block
  } = props

  const className = ctx({
    [styles.base]: true,
    [styles.bar]: buttonBar,
    [styles.justified]: justified || block,
    [styles.centered]: centered,
    [styles.block]: block
  })

  return (
    <div className={className}>
      {children}
    </div>
  )
}

ButtonGroup.defaultProps = defaultProps

export default ButtonGroup
