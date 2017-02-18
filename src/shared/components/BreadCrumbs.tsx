import * as React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router'
const changeCase = require('change-case')

interface Props {
  dispatch?: Function
  routes?: { path: string }[]
}

export const BreadCrumbs: React.StatelessComponent<Props> = (props: Props) => {
  const {routes} = props
  console.log(props)
  return (
    <Breadcrumb>
      <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
      {routes.slice(1).map(route => <Breadcrumb.Item>
        {changeCase.titleCase(route.path)}
      </Breadcrumb.Item>)}
    </Breadcrumb>
  )
}
