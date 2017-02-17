import * as React from 'react'

const styles = require('./ButtonGroup.css')

const ctx = require('classnames')

interface Props {
  children?: React.ReactChild
  buttonBar?: boolean
  justified?: boolean
  centered?: boolean
  block?: boolean
  maxWidth?: number
}

const defaultProps: Props = {
  buttonBar: false,
  justified: false,
  block: false,
  centered: false,
  maxWidth: null
}

const ButtonGroup: React.StatelessComponent<any> = (props: Props) => {
  const {
    children,
    buttonBar,
    justified,
    centered,
    block,
    maxWidth
  } = props

  const className = ctx({
    [styles.base]: true,
    [styles.bar]: buttonBar,
    [styles.justified]: justified || block,
    [styles.centered]: centered,
    [styles.block]: block
  })

  return (
    <div style={maxWidth ? {maxWidth} : null} className={className}>
      {children}
    </div>
  )
}

ButtonGroup.defaultProps = defaultProps

export { ButtonGroup }
