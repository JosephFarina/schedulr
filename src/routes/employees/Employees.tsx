import * as React from 'react'

import {
  Pane,
  MainPane,
} from 'src/shared'

import EmployeeToolbar from './containers/EmployeeToolbar'

interface Props {
  dispatch?: Function
  children?: any
}

const Employees: React.StatelessComponent<Props> = (props: Props) => <div>
  <EmployeeToolbar />
  <Pane>
    <MainPane>
      {props.children}
    </MainPane>
  </Pane>
</div>

export default Employees
