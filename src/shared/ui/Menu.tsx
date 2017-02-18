import * as React from 'react'

import { Link, LinkProps } from 'react-router'
const styles = require('./Menu.scss')

export const Label = (props) => (
  <div className={styles.Label}>
    {props.children}
  </div>
)

export const List = (props) => (
  <ul className={styles.List}>
    {props.children}
  </ul>
)

export const Item = (props) => {
  return <Link {...props}>{props.children}</Link>
}