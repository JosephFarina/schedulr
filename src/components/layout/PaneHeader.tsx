import * as React from 'react'

const styles = require('./PaneHeader.css')

interface Props {
  children?: React.ReactChild
}

const PaneHeader: React.StatelessComponent<any> = (props: Props) => {
  const { children } = props

  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default PaneHeader
