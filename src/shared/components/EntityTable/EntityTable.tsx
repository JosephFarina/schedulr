import * as React from 'react'
const Table = require('antd/lib/table')

import { TableProps } from 'antd'

interface Props extends TableProps {

}

export const EntityTable = (props: Props) => (
  <Table
    {...props}
    locale={{emptyText: <h3>No Data!</h3>}}
    bordered
    rowKey={ent => ent.id}
    style={{ maxWidth: '1000px', margin: '25px auto' }}
  />
)
