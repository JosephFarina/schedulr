import * as React from 'react'

const styles = require('./Navbar.css')

interface Props {
  children?: React.ReactChild
}

const Navbar: React.StatelessComponent<any> = (props: Props) => {
  const { children } = props

  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default Navbar
