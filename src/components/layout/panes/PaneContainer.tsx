import * as React from 'react'

const styles = require('./PaneContainer.css')

interface Props {
  children?: React.ReactChild
}

export const PaneContainer: React.StatelessComponent<any> = ({children = null}: Props) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}
