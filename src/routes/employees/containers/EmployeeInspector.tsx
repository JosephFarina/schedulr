import * as React from 'react'

import { Employee } from 'src/models'
import { connect } from 'react-redux'

import { getEmployeeById } from 'src/state/entities'

import UpcomingShiftPreview from './../components/UpcomingShiftsPreview'

const styles = require('./EmployeeInspector.scss')
const ctx = require('classnames')

const Card = require('antd/lib/card')
const Timeline = require('antd/lib/timeline')
const Rate = require('antd/lib/rate')

interface Props {
  dispatch?: Function
  employee?: Employee
  params?: {
    inspector: string
  }
}

const EmployeeInspector: React.StatelessComponent<Props> = (props: Props) => {
  const { } = props

  return (
    <div className={styles.cardGrid}>
      <div className={styles.cardColumn}>
        <Card title="Details" style={{ flex: '1 1', margin: '10px' }}>

        </Card>
      </div>
      <div className={styles.cardColumn}>
        <Card title="Client Rapport" style={{ flex: '1 1', margin: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2><strong>Client One:</strong></h2>
            <Rate allowHalf></Rate>
          </div>
          <div style={{width: '100%', height: '1px', background: '#e9e9e9'}} />
        </Card>
      </div>
      <div className={styles.cardColumn}>
        <Card title="Upcoming Shifts" style={{ flex: '1 1', margin: '10px' }} >
          <UpcomingShiftPreview />
        </Card>
      </div>
    </div>
  )
}

const defaultProps: Props = {

}

EmployeeInspector.defaultProps = defaultProps

const mapStateToProps = (state, ownProps: Props) => {
  return {
    employee: getEmployeeById(state, ownProps.params.inspector)
  }
}

export default connect(mapStateToProps)((EmployeeInspector as any))
