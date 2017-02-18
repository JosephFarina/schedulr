import * as React from 'react'

import { } from 'src/models'
import { connect } from 'react-redux'

const styles = require('./Employee.scss')
const ctx = require('classnames')

interface Props {
  dispatch?: Function
}

const Employee: React.StatelessComponent<Props> = (props: Props) => {
  const { } = props

  const klass = ctx({})

  return (
    <div>
    Employee
    </div>
  )
}

const defaultProps: Props = {

}

Employee.defaultProps = defaultProps

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

export default connect(mapStateToProps)(Employee)
