import * as React from 'react'

import { Toolbar, ToolbarItems } from 'src/shared'
const Input = require('antd/lib/input')
const Radio = require('antd/lib/radio')
const Button = require('antd/lib/button')

export const EmployeeToolbar = (props) => {

  return <Toolbar>
    <h2><strong>5 Employees</strong></h2>

    <ToolbarItems>
      <Input.Search
        placeholder="Find Employee"
        style={{ width: 200 }}
        onSearch={console.log}
      />

      <Button>New</Button>
      <Radio.Group>
        <Radio.Button value="a">Grid</Radio.Button>
        <Radio.Button value="b">Heirarchy</Radio.Button>
      </Radio.Group>
      <Button.Group>
        <Button>Import</Button>
        <Button>Export</Button>
      </Button.Group>

    </ToolbarItems>
  </Toolbar>
}