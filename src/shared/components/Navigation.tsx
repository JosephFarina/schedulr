import * as React from 'react'
import { slice, compose, map, prop, join } from 'ramda'

import { SubNav } from 'src/shared'
const Tabs = require('antd/lib/tabs')

interface Props {
  dispatch?: Function
  routes?: { path: string }[]
  router?: {
    replace: (x: any) => void
  }
}

export const Navigation: React.StatelessComponent<Props> = (navProps: Props) => {
  const { routes, router} = navProps

  const activeRoute = compose(
    join(''),
    map(prop('path')),
    slice(0, 2)
  )(routes)

  return (
    <SubNav>
      <Tabs defaultActiveKey="/schedule" activeKey={activeRoute} onChange={router.replace}>
        <Tabs.TabPane tab="Schedule" key="/schedule" />
        <Tabs.TabPane tab="Employees" key="/employees" />
        {/*<Tabs.TabPane tab="Clients" key="3" />
        <Tabs.TabPane tab="Positions" key="4" />
        <Tabs.TabPane tab="Settings" key="5" />*/}
      </Tabs>
    </SubNav>
  )
}
