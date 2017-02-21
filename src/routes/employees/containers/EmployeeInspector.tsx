import * as React from 'react'

import {
  Employee,
  UnnormalizedShift,
  Position,
  EmployeeFavorability
} from 'src/models'
import { connect } from 'react-redux'

import {
  getEmployeeById,
  getEmployeeInspectorUpcomingShifts,
  fetchEmployeeDetails,
  fetchingEmployeeInspectorDetails,
  getPositions,
  getEmployees,
  editEmployees,
  getEmployeeFavorabilitiesByEmployeeId,
  editEmployeeFavorabilities
} from 'src/state/entities'

import { EditableText } from 'src/shared'

import UpcomingShiftPreview from './../components/UpcomingShiftsPreview'
import EmployeeDetailsEditor from './../components/EmployeeDetailsEditors'
import EmployeeFavorabilityEditor from './../components/EmployeeFavorabilityEditor'

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
  employeeFavorabilities?: EmployeeFavorability[]
  getEmployeeDetails: (id: string) => void
  updateEmployeeFavorabilityRating: (id: string) => (val: number) => any
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
    const {
      fetchingData,
      upcomingShifts,
      employee,
      positions,
      employees,
      onDetailChange,
      employeeFavorabilities,
      updateEmployeeFavorabilityRating
    } = this.props

    console.log(employee)

    return (
      <div className={styles.cardGrid}>
        <div className={styles.cardColumn}>
          <Card loading={fetchingData} title="Availability" style={{ flex: '1 1 100%', margin: '10px' }} bodyStyle={{ display: 'none' }}>
            <h2>{employee.alias}</h2>
          </Card>
          <Card loading={fetchingData} title="Details" style={{ flex: '1 1 100%', margin: '10px' }}>

            <EmployeeDetailsEditor onChange={onDetailChange(employee.id)} fields={[
              { fieldName: 'First Name', value: employee.firstName, key: 'firstName' },
              { fieldName: 'Last Name', value: employee.lastName, key: 'lastName' },
              { fieldName: 'Alias', value: employee.alias, key: 'alias' },
              {
                fieldName: 'Position',
                value: typeof employee.position === 'string' ? employee.position : null,
                key: 'position',
                selectOptions: positions
              },
              {
                fieldName: 'Manager',
                value: typeof employee.manager === 'string' ? employee.manager : null,
                key: 'manager',
                selectOptions: employees
              }
            ]} />

          </Card>
        </div>

        <div className={styles.cardColumn}>
          <Card loading={fetchingData} title="Client Rapport" style={{ flex: '1 1', margin: '10px' }}>
            <EmployeeFavorabilityEditor employeeFavorabilies={employeeFavorabilities} onChange={updateEmployeeFavorabilityRating} />
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
    positions: getPositions(state),
    employeeFavorabilities: getEmployeeFavorabilitiesByEmployeeId(state, ownProps.params.inspector)
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
  },
  updateEmployeeFavorabilityRating: (id: string) => (rating: number) => {
    dispatch(editEmployeeFavorabilities([{
      id,
      rating
    }]))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)((EmployeeInspector as any))
