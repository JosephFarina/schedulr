import * as React from 'react'

const ctx = require('classnames')
const styles = require('./PaneContent.css')

interface Props {
  children?: React.ReactChild
  noHeader?: boolean
  scrollable?: boolean
}

const PaneContent: React.StatelessComponent<any> = (props: Props) => {
  const {
    children,
    noHeader,
    scrollable
  } = props

  const klass = ctx({
    [styles.container]: true,
    [styles.noHeader]: noHeader,
    [styles.scrollable]: scrollable
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