import * as React from 'react'
import {
  MapStateToProps,
  connect,
} from 'react-redux'

import {
  RAlert,
  RState,
} from 'src/models'

import {
  getAlertInfo
} from 'src/state/ui/alert'

const styles = require('./Alert.css')
const ctx = require('classnames')

interface AlertProps {
  alert: RAlert
}

const defaultProps: AlertProps = {
  alert: null
}

const Alert: React.StatelessComponent<AlertProps> = (props: AlertProps) => {
  const { alert } = props
  const {
    message,
    type
  } = alert

  console.log(
    !!alert,
    !alert
  )

  const alertClass = ctx({
    [styles.snackbar]: true,
    [styles.snackbarInactive]: !type
  })

  return (
    <div className={alertClass}>
      {type && <div className={styles.text}>{message}</div>}
    </div>
  )
}

Alert.defaultProps = defaultProps

const mapStateToProps: MapStateToProps<any, any> = (state: RState, ownProps: AlertProps) => {
  return {
    alert: getAlertInfo(state)
  }
}

export default connect(mapStateToProps)(Alert)
