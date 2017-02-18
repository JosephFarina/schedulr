import * as React from 'react'
import { shallow } from 'enzyme'
import { BreadCrumbs } from './../BreadCrumbs'
import { Breadcrumb } from 'antd'

describe('BreadCrumbs', () => {
  const routes = [
    { path: '/' },
    { path: 'scheduling' },
    { path: 'new-shift' }
  ]

  it('should convert route path into breadcrumbs', () => {
    const wrapper = shallow(<BreadCrumbs routes={routes} />)
    console.log(wrapper.find(Breadcrumb.Item).debug())
    wrapper.find(Breadcrumb.Item).forEach((crumb, i) => {
      expect(crumb.text()).toEqual(routes[i].path)
    })
  })

})
