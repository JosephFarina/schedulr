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

import {
  EditableText,
  Panel,
  PanelColumn,
  PanelContainer,
  PanelCard
} from 'src/shared'

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
  updateEmployeeFavorability: (id: string) => (key: 'rating' | 'canWorkWith') => (val: number) => any
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
      updateEmployeeFavorability
    } = this.props

    const employeeEditorFields = [
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
    ]

    return (
      <PanelContainer>
        <PanelColumn>
          <Panel
            title={'Availability'}
            body={<EmployeeDetailsEditor
              onChange={onDetailChange(employee.id)}
              fields={employeeEditorFields}
            />}
          />
          <Panel
            title="Client Rapport"
            body={<EmployeeFavorabilityEditor
              employeeFavorabilies={employeeFavorabilities}
              onChange={updateEmployeeFavorability}
            />}
          />
        </PanelColumn>
        <PanelColumn>
          <Panel
            title="Upcoming Shifts"
            body={<UpcomingShiftPreview shifts={upcomingShifts} />}
          />
        </PanelColumn>
      </PanelContainer>
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
    dispatch(editEmployees([{ id, [key]: value }]))
  },
  getEmployeeDetails(id) {
    dispatch(fetchEmployeeDetails(id))
  },
  updateEmployeeFavorability: (id: string) => (key: 'rating' | 'canWorkWith') => (val: number) => {
    dispatch(editEmployeeFavorabilities([{ id, [key]: val }]))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)((EmployeeInspector as any))
