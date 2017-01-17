import * as React from 'react'

const ctx = require('classnames')
const styles = require('./PaneContent.css')

interface Props {
  children?: React.ReactChild
  noHeader?: boolean
}

const PaneContent: React.StatelessComponent<any> = (props: Props) => {
  const {
    children,
    noHeader
  } = props

  const klass = ctx({
    [styles.container]: true,
    [styles.noHeader]: noHeader
  })

  return (
    <div className={klass}>
      {children}
    </div>
  )
}

PaneContent.defaultProps = {
  noHeader: false
}

export { PaneContent }