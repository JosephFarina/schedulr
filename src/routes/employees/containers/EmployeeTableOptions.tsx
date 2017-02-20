import * as React from 'react'

import { Employee } from 'src/models'
import { connect } from 'react-redux'

const styles = require('./EmployeeTableOptions.scss')

const Popconfirm = require('antd/lib/popconfirm')
const Popover = require('antd/lib/popover')
import { Button } from 'src/shared'
import { deleteEmployees } from 'src/state/entities'

interface Props {
  dispatch?: Function
  employee: Employee
  deleteEmployee: (employee: Employee) => void
}

const EmployeeTableOptions: React.StatelessComponent<Props> = (props: Props) => {
  const { employee, deleteEmployee} = props

  return (
    <Popover trigger="click" placement="bottomRight" content={<div className={styles.popoverContainer}>

      <Button to={`/employees/${employee.id}`} icon="select">Employee</Button>
      <Button icon="select">Manager</Button>
      <Button icon="select">Position</Button>

      <Popconfirm
        title={`Are you sure you want to remove ${employee.alias}?`}
        onConfirm={_ => deleteEmployee(employee)}
        onCancel={console.log}
        okText="Yes"
        cancelText="No"
      >
        <Button type="danger" icon="delete" >Delete</Button>
      </Popconfirm>
    </div>}>

      <Button shape="circle" icon="ellipsis" />

    </Popover>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteEmployee(employee: Employee) {
    dispatch(deleteEmployees([employee]))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTableOptions)
