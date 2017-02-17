import * as React from 'react'
const ctx = require('classnames')

const styles = require('./PaneSidebar.css')

interface Props {
  children?: React.ReactChild
  maximized?: boolean
  minimized?: boolean
  split?: boolean
}

const defaultProps: Props = {
  maximized: false,
  minimized: false,
  split: false
}

const PaneSidebar: React.StatelessComponent<any> = (props: Props) => {
  const {
    children,
    maximized,
    minimized,
    split
  } = props

  const className = ctx({
    [styles.container]: true,
    [styles.halfScreen]: maximized,
    [styles.minimized]: minimized,
    [styles.split]: split
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
