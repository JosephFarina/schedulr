import * as React from 'react'

import AccountSidebar from './components/AccountSidebar'

import {
  PaneContainer,
  Navbar,
  PaneBody,
  PaneHeader,
  PaneContent,
  Menu
} from 'src/shared/ui'

interface Props {
  children: React.ReactChildren
}

const Account: React.StatelessComponent<Props> = (props: Props) => {
  const { children } = props

  return (
    <div>
      <Navbar />
      <PaneContainer>
        <AccountSidebar />
        <PaneBody>
          {children}
        </PaneBody>
      </PaneContainer>
    </div>
  )
}

export default Account
