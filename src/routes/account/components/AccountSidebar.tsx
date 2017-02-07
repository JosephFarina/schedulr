import * as React from 'react'

import { connect } from 'react-redux'
import { } from 'src/models'

import {
  PaneSidebar,
  PaneContent
} from 'src/shared/components/layout'

const styles = require('./AccountSidebar.scss')
const ctx = require('classnames')

interface Props {
  dispatch?: Function
}

const AccountSidebar: React.StatelessComponent<Props> = (props: Props) => {
  const { } = props

  const klass = ctx({})

  return (
    <PaneSidebar>
      <PaneContent noHeader>
        <div className={styles.tab}>Employees</div>
        <div className={styles.tab}>Clients</div>
        <div className={styles.tab}>Locations</div>
        <div className={styles.tab}>Positions</div>
      </PaneContent>
    </PaneSidebar>
  )
}

const defaultProps: Props = {

}

AccountSidebar.defaultProps = defaultProps

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

export default connect(mapStateToProps)(AccountSidebar)
