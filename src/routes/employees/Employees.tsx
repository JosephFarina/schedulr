import * as React from 'react'

import { RState, Employee, EmployeeWithPosition } from 'src/models'
import {
  Pane,
  MainPane,
  EntityTable,
  EntityTableCell
} from 'src/shared'
import { connect } from 'react-redux'
import { curry } from 'ramda'

import EmployeeToolbar from './containers/EmployeeToolbar'
import {
  getEmployeesWithPositions,
  editEmployees
} from 'src/state/entities/employees'

interface Props {
  dispatch?: Function
  employees?: EmployeeWithPosition[]

  onCellChange?: (record: any, key: string) => (val: string) => void
}


const renderCell = curry(function renderCell(onCellChange, keyName, text, record, index) {
  return <EntityTableCell
    value={text}
    onChange={onCellChange(record, keyName)}
  />
})


const Employees: React.StatelessComponent<Props> = (props: Props) => {
  const { employees, onCellChange } = props
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: renderCell(onCellChange, 'firstName'),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      render: renderCell(onCellChange, 'lastName'),
    },
    {
      title: 'Position',
      dataIndex: 'position.alias',
      key: 'position.id'
    }
  ]


  return (
    <div>
      <EmployeeToolbar />
      <Pane>
        <MainPane>
          <EntityTable
            dataSource={employees}
            columns={columns}
            expandedRowRender={record =>
              <div>
                <h1>{record.firstName}</h1>
                <p>{JSON.stringify(record)}</p>
              </div>
            }
          />
        </MainPane>
      </Pane>
    </div>
  )
}

const defaultProps: Props = {

}

Employees.defaultProps = defaultProps

const mapStateToProps = (state, ownProps) => {
  return {
    employees: getEmployeesWithPositions(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCellChange: (record, key) => (value) => {
      console.log(record, key, value)
      dispatch(editEmployees([{
        id: record.id,
        [key]: value
      }]))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)((Employees as any))
