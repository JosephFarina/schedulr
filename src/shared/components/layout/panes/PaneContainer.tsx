import * as React from 'react'

const styles = require('./PaneContainer.css')
const ctx = require('classnames')

interface Props {
  children?: React.ReactChild
  noNavbar?: boolean
}


export const PaneContainer: React.StatelessComponent<any> = ({children = null, noNavbar = false}: Props) => {
  const klass = ctx({
    [styles.container]: true,
    [styles.noNavbar]: noNavbar
  })

  return (
    <div className={klass}>
      {children}
    </div>
  )
}
