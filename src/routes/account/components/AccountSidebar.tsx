import * as React from 'react'

import { connect } from 'react-redux'
import { } from 'src/models'

import {
  PaneSidebar,
  PaneContent,
  Menu
} from 'src/shared/ui'

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
        <Menu.Label>Employees</Menu.Label>
        <Menu.List>
          <Menu.Item>asdf</Menu.Item>
          <li>
            <ul>
              <Menu.Item>asdf</Menu.Item>
            </ul>
          </li>
        </Menu.List>
        <Menu.Label>Clients</Menu.Label>
        <Menu.List>
          <Menu.Item>asdf</Menu.Item>
          <li>
            <ul>
              <Menu.Item>asdf</Menu.Item>
            </ul>
          </li>
        </Menu.List>

        {/*<div className={styles.tab}>Employees</div>
        <div className={styles.tab}>Clients</div>
        <div className={styles.tab}>Locations</div>
        <div className={styles.tab}>Positions</div>*/}
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
