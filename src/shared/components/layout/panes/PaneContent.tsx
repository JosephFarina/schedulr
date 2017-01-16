import * as React from 'react'

const styles = require('./PaneContent.css')

interface Props {
  children?: React.ReactChild
}

export const PaneContent: React.StatelessComponent<any> = (props: Props) => {
  const { children } = props
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

