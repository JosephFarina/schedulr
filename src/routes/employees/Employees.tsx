import * as React from 'react'

import { RState, Employee } from 'src/models'
import { Pane, MainPane } from 'src/shared'
import { connect } from 'react-redux'

import EmployeeToolbar from './containers/EmployeeToolbar'
import { getEmployees } from 'src/state/entities/employees'

const Table = require('antd/lib/table')
const Input = require('antd/lib/input')
const Icon = require('antd/lib/icon')
const Button = require('antd/lib/button')

interface Props {
  dispatch?: Function
  employees?: Employee[]
}



interface State {
  editable?: boolean
  value?: string
}

class Cell extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      editable: false,
      value: this.props.value
    }
  }

  handleChange = e => {
    const value = e.target.value
    this.setState({ value })
  }

  check = e => {
    this.setState({ editable: false })
    if (this.props.onChange) {
      this.props.onChange(this.state.value)
      this.setState({ value: this.props.value })
    }
  }

  edit = e => {
    this.setState({ editable: true })
  }

  render() {
    const { value, editable } = this.state
    return (<div className="editable-cell">
      {
        editable ?
          <div className="editable-cell-input-wrapper">
            <Input
              value={value}
              onChange={this.handleChange}
              onPressEnter={this.check}
            />
            <Icon
              type="check"
              className="editable-cell-icon-check"
              onClick={this.check}
            />
          </div>
          :
          <div className="editable-cell-text-wrapper">
            {value || ' '}
            <Icon
              type="edit"
              className="editable-cell-icon"
              onClick={this.edit}
            />
          </div>
      }
    </div>)
  }
}



function onCellChange(index, key) {
  return (value) => {
    console.log(index, key, value)
  }
}



const Employees: React.StatelessComponent<Props> = (props: Props) => {
  const { employees } = props


  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text, record, index) => (
        <Cell
          value={text}
          onChange={onCellChange(index, 'name')}
        />
      ),

    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      render: (text, record, index) => (
        <Cell
          value={text}
          onChange={onCellChange(index, 'name')}
        />
      ),
    }
  ]


  return (
    <div>
      <EmployeeToolbar />
      <Pane>
        <MainPane>
          <Table
            bordered
            rowKey={employee => employee.id}
            dataSource={employees}
            style={{ maxWidth: '1000px', margin: '25px auto' }}
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
    employees: getEmployees(state)
  }
}

export default connect(mapStateToProps)((Employees as any))
