import * as React from 'react'

const styles = require('./Pane.scss')

export const Container = (props) => (
  <div className={styles.container}>{props.children}</div>
)

export const Pane = (props) => (
  <div className={styles.pane}>{props.children}</div>
)

export const MainPane = (props) => (
  <div className={styles.main}>{props.children}</div>
)

export const SidePane = (props) => (
  <div className={styles.side}>{props.children}</div>
)
