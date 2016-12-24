import * as React from 'react'

const styles = require('./PaneBody.css')

interface Props {
  children?: React.ReactChild
}

const PaneBody: React.StatelessComponent<any> = (props: Props) => {
  const { children } = props
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default PaneBody
