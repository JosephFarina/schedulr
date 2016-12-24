import * as React from 'react';

const styles = require('./PaneContent.css')

interface Props {
  children?: React.ReactChild
}

const PaneContent: React.StatelessComponent<any> = (props: Props) => {
  const { children } = props
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default PaneContent
