import * as React from 'react'
import { connect } from 'react-redux'

import { } from 'src/models'
import { SubNav } from 'src/shared'
const Tabs = require('antd/lib/tabs')


// const styles = require('./Navigation.scss')
const ctx = require('classnames')

interface Props {
  dispatch?: Function
}

const Navigation: React.StatelessComponent<Props> = (props: Props) => {
  const { } = props

  return (
    <SubNav>
      <Tabs defaultActiveKey="1" onChange={console.log}>
        <Tabs.TabPane tab="Schedule" key="1" />
        <Tabs.TabPane tab="Employees" key="2" />
        <Tabs.TabPane tab="Clients" key="3" />
        <Tabs.TabPane tab="Positions" key="4" />
        <Tabs.TabPane tab="Settings" key="5" />
      </Tabs>
    </SubNav>
  )
}

const defaultProps: Props = {

}

Navigation.defaultProps = defaultProps

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

export default connect(mapStateToProps)(Navigation)
