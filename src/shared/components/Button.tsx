import * as React from 'react'

import { Link, } from 'react-router'
const AntButton = require('antd/lib/button')

interface Props {
  dispatch?: Function
  type?: 'primary' | 'secondary'
  to?: string
  children?: any
  onClick?: (val: any) => any
}

export const Button: React.StatelessComponent<Props> = (props: Props) => {
  const {to} = props

  return to ?
    <AntButton
      {...props}
    ><Link to={to}>{props.children}</Link></AntButton>
    :
    <AntButton
      {...props}
    />
}

export const ButtonGroup: React.StatelessComponent<{}> = (props: {}) => {
  const {} = props

  return <AntButton.Group
    {...props}
  />
}
