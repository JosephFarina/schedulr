import * as React from 'react'
import { TopNav } from 'src/shared'
import { BreadCrumbs } from './BreadCrumbs'


interface Props {
  dispatch?: Function
}

export const InfoBar: React.StatelessComponent<Props> = (props: Props) => {

  return (
    <TopNav>
      <BreadCrumbs {...props} />
    </TopNav>
  )
}

