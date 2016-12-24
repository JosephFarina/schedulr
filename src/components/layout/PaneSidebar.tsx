import * as React from 'react'

const styles = require('./PaneSidebar.css')

interface Props {
  children?: React.ReactChild
}

const PaneSidebar: React.StatelessComponent<any> = (props: Props) => {
  const { children } = props

  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default PaneSidebar
