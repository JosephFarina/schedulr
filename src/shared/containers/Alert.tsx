import * as React from 'react'
import {
  MapStateToProps,
  connect,
} from 'react-redux'

import {
  RNotification,
  RState,
} from 'src/models'

import { errorArrayToString } from 'src/utils'

import {
  getNotificationMessages
} from 'src/state/ui/notification'

const styles = require('./Alert.css')
const ctx = require('classnames')

interface AlertProps {
  messages: string[]
}

const defaultProps: AlertProps = {
  messages: [
    'This is an alert right here'
  ]
}

export const Alert: React.StatelessComponent<AlertProps> = (props: AlertProps) => {
  const {
    messages
  } = props

  const alertClass = ctx({
    [styles.banner]: true,
  })

  return (
    <div>
      {messages && <div className={alertClass}>
        <div className={styles.ErrorMessage}>{errorArrayToString(messages)}</div>
      </div>
      }
    </div>
  )
}

Alert.defaultProps = defaultProps

const mapStateToProps: MapStateToProps<any, any> = (state: RState, ownProps: AlertProps) => {
  return {
    messages: getNotificationMessages(state)
  }
}

export default connect(mapStateToProps)(Alert)
