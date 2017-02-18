import * as React from 'react'

import { Link } from 'react-router'
const changeCase = require('change-case')
const Breadcrumb = require('antd/lib/breadcrumb')
import { curry } from 'ramda'

interface Props {
  dispatch?: Function
  routes?: { path: string }[]
}

const routeBuilder = curry(function getCurrRoute(routes, index) {
  let route = ''

  for (let i = 0; i <= index; i++) {
    route += '/' + routes[i].path
  }

  return route
})

export const BreadCrumbs: React.StatelessComponent<Props> = (props: Props) => {
  const {routes} = props

  const routesWithoutHome = routes.slice(1)
  const getRoute = routeBuilder(routesWithoutHome)
  return (
    <Breadcrumb>
      <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>

      {
        routesWithoutHome.map((route, i) => (
          <Breadcrumb.Item key={route.path}>
            <Link to={getRoute(i)}>{changeCase.titleCase(route.path)}</Link>
          </Breadcrumb.Item>
        ))}

    </Breadcrumb>
  )
}

