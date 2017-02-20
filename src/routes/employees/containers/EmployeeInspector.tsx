import * as React from 'react'

import { Employee, UnnormalizedShift, Position } from 'src/models'
import { connect } from 'react-redux'

import {
  getEmployeeById,
  getEmployeeInspectorUpcomingShifts,
  fetchEmployeeDetails,
  fetchingEmployeeInspectorDetails,
  getPositions,
  getEmployees,
  editEmployees
} from 'src/state/entities'

import { EditableText } from 'src/shared'

import UpcomingShiftPreview from './../components/UpcomingShiftsPreview'
import EmployeeDetailsEditor from './../components/EmployeeDetailsEditors'

const styles = require('./EmployeeInspector.scss')
const ctx = require('classnames')

const Card = require('antd/lib/card')
const Switch = require('antd/lib/switch')
const Icon = require('antd/lib/icon')
const Timeline = require('antd/lib/timeline')
const Rate = require('antd/lib/rate')

interface Props {
  employee?: Employee
  employees?: Employee[]
  fetchingData?: boolean
  positions?: Position[]
  upcomingShifts?: UnnormalizedShift[]
  getEmployeeDetails: (id: string) => void
  params?: {
    inspector: string
  }

  onDetailChange: (id: string) => (key: string) => (value: string) => void
}

class EmployeeInspector extends React.Component<Props, {}> {
  componentDidMount() {
    const {getEmployeeDetails, params} = this.props
    getEmployeeDetails(params.inspector)
  }

  render() {
    const { fetchingData, upcomingShifts, employee, positions, employees, onDetailChange } = this.props

    console.log(employee)

    return (
      <div className={styles.cardGrid}>
        <div className={styles.cardColumn}>
          <Card loading={fetchingData} style={{ flex: '1 1 30%', margin: '10px' }}>
            <h2>{employee.alias}</h2>
          </Card>
          <Card loading={fetchingData} title="Details" style={{ flex: '1 1 100%', margin: '10px' }}>

            <EmployeeDetailsEditor onChange={onDetailChange(employee.id)} fields={[
              { fieldName: 'First Name', value: this.props.employee.firstName, key: 'firstName' },
              { fieldName: 'Last Name', value: this.props.employee.lastName, key: 'lastName' },
              { fieldName: 'Alias', value: this.props.employee.alias, key: 'alias' },
              {
                fieldName: 'Position',
                value: typeof this.props.employee.position === 'string' ? this.props.employee.position : null,
                key: 'position',
                selectOptions: positions
              },
              {
                fieldName: 'Manager',
                value: typeof this.props.employee.manager === 'string' ? this.props.employee.manager : null,
                key: 'manager',
                selectOptions: employees
              }
            ]} />

          </Card>
        </div>

        <div className={styles.cardColumn}>
          <Card loading={fetchingData} title="Client Rapport" style={{ flex: '1 1', margin: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2><strong>Client One:</strong></h2>
              <Switch checkedChildren={<Icon type="like" />} unCheckedChildren={<Icon type="dislike" />} />
              <Rate allowHalf></Rate>
            </div>
            <div style={{ width: '100%', height: '1px', background: '#e9e9e9' }} />
          </Card>
        </div>

        <div className={styles.cardColumn}>
          <Card loading={fetchingData} title="Upcoming Shifts" style={{ flex: '1 1', margin: '10px' }} >
            <UpcomingShiftPreview shifts={upcomingShifts} />
          </Card>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps: Props) => {
  return {
    employees: getEmployees(state),
    employee: getEmployeeById(state, ownProps.params.inspector),
    upcomingShifts: getEmployeeInspectorUpcomingShifts(state),
    fetchingData: fetchingEmployeeInspectorDetails(state),
    positions: getPositions(state)
  }
}

const mapDispatchToProps = dispatch => ({
  onDetailChange: (id: string) => (key: string) => (value: string) => {
    dispatch(editEmployees([{
      id, [key]: value
    }]))
  },
  getEmployeeDetails(id) {
    dispatch(fetchEmployeeDetails(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)((EmployeeInspector as any))
