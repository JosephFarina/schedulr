import * as React from 'react'

// tslint:disable-next-line:no-unused-variable
import CSSModules from 'react-css-modules'
const styles = require('./PaneContainer.css')

interface Props {
  children?: React.ReactChild
}

const PaneContainer: React.StatelessComponent<any> = ({children = null}: Props) => {
  return (
    <div className={styles.container}>
      {children}
      <h1 className={styles.h}>asfdf</h1>
    </div >
  )
}

export default PaneContainer
