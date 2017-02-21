import * as React from 'react'
import { connect } from 'react-redux'

import { employeeViewOptions } from 'src/models'
import {
  getEmployeeCount,
  searchForEmployee,
  getEmployeeSearchValue,
  changeEmployeeView,
  getEmployeeView
} from 'src/state/entities'

import { Toolbar, ToolbarItems, Button, ButtonGroup } from 'src/shared'
const Input = require('antd/lib/input')
const Radio = require('antd/lib/radio')

interface Props {
  employeeCount: number
  searchVal: string
  view: employeeViewOptions

  searchChange: (val: string) => void
  gridView: () => void
  hierarchyView: () => void
}

export const EmployeeToolbar = (props: Props) => {
  const {
    employeeCount,
    searchChange,
    searchVal,
    gridView,
    hierarchyView,
    view
  } = props

  return <Toolbar>
    <h2><strong>{employeeCount || 0} Employees</strong></h2>

    <ToolbarItems>
      <Input.Search
        placeholder="Find Employee"
        style={{ width: 200 }}
        value={searchVal}
        onChange={searchChange}
      />

      <Button to="/employees/new">New</Button>
      <ButtonGroup>
        <Button type={view === 'grid' ? 'primary' : 'secondary'} onClick={gridView}>Grid</Button>
        <Button type={view === 'hierarchy' ? 'primary' : 'secondary'} onClick={hierarchyView}>Heirarchy</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button>Import</Button>
        <Button>Export</Button>
      </ButtonGroup>

    </ToolbarItems>
  </Toolbar>
}

function mapStateToProps(state, ownProps) {
  return {
    employeeCount: getEmployeeCount(state),
    searchVal: getEmployeeSearchValue(state),
    view: getEmployeeView(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchChange({target}) {
      dispatch(searchForEmployee(target.value))
    },
    gridView() {
      dispatch(changeEmployeeView('grid'))
    },
    hierarchyView() {
      dispatch(changeEmployeeView('hierarchy'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)((EmployeeToolbar as any))
