import * as React from 'react'
import { connect } from 'react-redux'

import { EmployeeWithPosition, Entity, Position } from 'src/models'
import { EntityTable, EditableText } from 'src/shared'

import EmployeeTableOptions from './EmployeeTableOptions'

import {
  getEmployeesWithPositions,
  editEmployees,
  getPositions,
} from 'src/state/entities'

interface Props {
  dispatch?: Function
  employees?: EmployeeWithPosition[]
  positions?: Position[]
  onCellChange?: (record: any, key: string) => (val: string) => void
}


function renderCell(onCellChange, keyName) {
  return (text, record, index) => <EditableText
    value={text}
    onChange={onCellChange(record, keyName)}
  />
}

function renderSelect(onCellChange, keyName, entities: Entity[] = null) {
  return (text, record, index) => <EditableText
    value={record.position.id}
    selectOptions={entities}
    onChange={onCellChange(record, keyName)}
  />
}


const EmployeeTable: React.StatelessComponent<Props> = (props: Props) => {
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
      render: renderSelect(onCellChange, 'position', positions),
    },
    {
      title: '',
      dataIndex: '',
      key: 'delete',
      width: 50,
      render: (text, record, index) => <EmployeeTableOptions employee={record} />,
    }
  ]
  console.log(employees)
  return <EntityTable dataSource={employees} columns={columns} />
}

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

export default connect(mapStateToProps, mapDispatchToProps)((EmployeeTable as any))
