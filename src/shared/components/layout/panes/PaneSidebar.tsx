import * as React from 'react'
const ctx = require('classnames')

const styles = require('./PaneSidebar.css')

interface Props {
  children?: React.ReactChild
  maximized?: boolean
  minimized?: boolean
}

const defaultProps: Props = {
  maximized: false,
  minimized: false
}

const PaneSidebar: React.StatelessComponent<any> = (props: Props) => {
  const {
    children,
    maximized,
    minimized
  } = props

  const className = ctx({
    [styles.container]: true,
    [styles.halfScreen]: maximized,
    [styles.minimized]: minimized
  })

  return (
    <div className={className}>
      {children}
    </div>
  )
}

PaneSidebar.defaultProps = defaultProps

export {
  PaneSidebar
}
