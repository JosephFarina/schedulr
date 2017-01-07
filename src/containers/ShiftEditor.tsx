import * as React from 'react'
import {
  MapStateToProps,
  connect,
} from 'react-redux'

import {
  Clients,
  Employees,
  Locations,
  RState,
  Shift
} from 'src/models'

import {
  getShiftBeingCreated,
  updateNewShift,
} from 'src/state/shift'

import Button from 'src/components/buttons/Button'
import ButtonGroup from 'src/components/buttons/ButtonGroup'
import AutoComplete from 'src/components/inputs/AutoComplete'
import Input from 'src/components/inputs/Input'
import Select from 'src/components/inputs/Select'

interface Props {
  dispatch?: Function
  newShift?: Shift

  // Entities
  clients?: Clients
  employees?: Employees
  locations?: Locations

  handleSubmit?(): void
  handleReset?(): void
}

interface State {

}

class ShiftEditor extends React.Component<Props, State> {
  public static defaultProps: Props = {
    handleReset: () => { },
    handleSubmit: () => { },
    newShift: {}
  }

  constructor(props: Props) {
    super(props)
  }


  /**
   * 
   * Renderers
   * 
   */

  private renderNewShiftEditor() {
    const {
      newShift,
      employees,
      clients,
      locations
    } = this.props

    const {
      client,
      duration,
      employee,
      id,
      location,
      startTime
    } = newShift

    return (
      <div>

        <Select value={'VAluee'} onChange={val => { console.log(val) } } options={[
          { value: '0', display: 'ONE' },
          { value: '1', display: 'TWO' },
          { value: '3', display: 'three' },
          { value: '4', display: 'four' },
        ]} />

      </div>
    )
  }

  public render() {
    return (
      <div>
        {this.renderNewShiftEditor()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToProps<Props, any> = (state: RState, ownProps: Props) => {
  return {
    shiftBeingCreated: getShiftBeingCreated(state)
  }
}

export default connect(mapStateToProps)(ShiftEditor)
