import * as React from 'react'
import { mount } from 'enzyme'
import { Link } from 'react-router'
import { BreadCrumbs } from './../BreadCrumbs'

const Breadcrumb = require('antd/lib/breadcrumb')
const changeCase = require('change-case')


describe('BreadCrumbs', () => {
  const routes = [
    { path: '/' },
    { path: 'schedule' },
    { path: 'new-shift' }
  ]

  const expected = [
    {
      text: 'Home',
      link: '/'
    },
    {
      text: 'Schedule',
      link: '/schedule'
    },
    {
      text: 'New Shift',
      link: '/schedule/new-shift'
    }
  ]

  it('should convert route path into breadcrumbs', () => {
    const wrapper = mount(<BreadCrumbs routes={routes} />)
    const items = wrapper.find(Breadcrumb.Item)

    items.forEach((crumb, ...weirdTypeScriptErrorForIndex) => {
      const [i] = weirdTypeScriptErrorForIndex
      const link = crumb.find(Link).props().to

      expect(crumb.text()).toContain(expected[i].text)
      expect(link).toEqual(expected[i].link)

    })
  })

})
