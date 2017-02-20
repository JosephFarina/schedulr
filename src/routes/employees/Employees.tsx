import * as React from 'react'

import { RState, Employee, EmployeeWithPosition , Entity, Position} from 'src/models'
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
  editEmployees,
  getPositions
} from 'src/state/entities'

interface Props {
  dispatch?: Function
  employees?: EmployeeWithPosition[]
  positions?: Position[]

  onCellChange?: (record: any, key: string) => (val: string) => void
}


function renderCell(onCellChange, keyName, select: Entity[] = null) {
  return (text, record, index) => <EntityTableCell
    value={text}
    selectOptions={select}
    onChange={onCellChange(record, keyName)}
  />
}


const Employees: React.StatelessComponent<Props> = (props: Props) => {
  const { employees, onCellChange, positions } = props
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
      key: 'position.id',
      render: renderCell(onCellChange, 'position', positions),
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
    employees: getEmployeesWithPositions(state),
    positions: getPositions(state)
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
