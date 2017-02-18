import * as React from 'react'

const styles = require('./Nav.scss')

export const TopNav = (props) => (
  <div className={styles.top}>{props.children}</div>
)

export const SubNav = (props) => (
  <div className={styles.sub}>{props.children}</div>
)
