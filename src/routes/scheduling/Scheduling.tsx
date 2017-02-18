import * as React from 'react'

import SchedulingCalendar from './containers/SchedulingCalendar'
import { Pane, MainPane, Toolbar } from 'src/shared'
const Radio = require('antd/lib/radio')
const Button = require('antd/lib/button')
const Icon = require('antd/lib/icon')

interface SchedulingProps {
  sidebar: React.ReactChildren
}

const Scheduling: React.StatelessComponent<SchedulingProps> = (props: SchedulingProps) => {
  const { sidebar } = props

  return <div>
    <Toolbar>
      <Button><Icon type="plus" /></Button>
      <Radio.Group>
        <Radio.Button value="a">Month</Radio.Button>
        <Radio.Button value="b">Week</Radio.Button>
      </Radio.Group>
    </Toolbar>
    <Pane>
      {sidebar}
      <MainPane>
        <SchedulingCalendar />
      </MainPane>
    </Pane>
  </div>
}

export default Scheduling
