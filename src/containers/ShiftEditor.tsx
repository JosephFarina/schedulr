import * as React from 'react'
import {
  MapStateToProps,
  connect,
} from 'react-redux'

import {
  RState,
  ScheduleSidebarMode,
  Shift
} from './../models'

import {
  getShiftBeingCreated,
  updateNewShift,
} from './../state/shift'

import Button from './../components/buttons/Button'
import ButtonGroup from './../components/buttons/ButtonGroup'
import AutoComplete from './../components/inputs/AutoComplete'
import Input from './../components/inputs/Input'
import Select from './../components/inputs/Select'

interface Props {
  dispatch?: Function
  editMode?: boolean // mode === 'editMode'
  newMode?: boolean // mode ==='newMode'
  shiftBeingCreated?: Shift

  handleSubmit?(): void // create new shift or edit shift depending on the mode 
  handleReset?(): void// clear the new shift blank or restore the unedited shift being edited 
  handleModeChange?(mode: ScheduleSidebarMode): void // toggle between edit and add state
  handleInputChangeEnd?(shift: Shift): void // on change end update redux
}

interface State {
  shiftBeingCreated: Shift
}

class ShiftEditor extends React.Component<Props, State> {
  public static defaultProps: Props = {
    shiftBeingCreated: {},
    handleInputChangeEnd: () => { },
    handleModeChange: () => { },
    handleReset: () => { },
    handleSubmit: () => { },
    editMode: false,
    newMode: true
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      shiftBeingCreated: {
        client: '',
        duration: 0,
        employee: [],
        location: '',
        startTime: ''
      } as Shift
    }
    this.updateNewShiftInState = this.updateNewShiftInState.bind(this)
    this.updateNewShiftInRedux = this.updateNewShiftInRedux.bind(this)
  }

  private updateNewShiftInState(nextShift: Shift): void {
    const { shiftBeingCreated } = this.state

    this.setState({
      shiftBeingCreated: Object.assign({}, shiftBeingCreated, nextShift)
    })
  }

  private updateNewShiftInRedux(): void {
    const { dispatch } = this.props
    const { shiftBeingCreated } = this.state
    dispatch(updateNewShift(shiftBeingCreated))
  }

  /**
   * 
   * Renderers
   * 
   */

  private renderModeChange() {
    const {
      handleModeChange,
      editMode,
      newMode
    } = this.props

    return (
      <ButtonGroup centered={true}>
        <Button onClick={() => handleModeChange('newShift')} active={newMode} mini={true} >New</Button>
        <Button onClick={() => handleModeChange('editShift')} active={editMode} mini={true} >Edited</Button>
      </ButtonGroup>
    )
  }

  private renderNewShiftEditor() {
    const { shiftBeingCreated } = this.state
    const {
      client,
      duration,
      employee,
      id,
      location,
      startTime
    } = shiftBeingCreated

    return (
      <div>
        <Select value={'VAluee'} onChange={val => { console.log(val) } } options={[
          { value: '0', display: 'ONE' },
          { value: '1', display: 'TWO' },
          { value: '3', display: 'three' },
          { value: '4', display: 'four' },
        ]} />

        <Input
          label={"Location"}
          value={location}
          onChange={val => { this.updateNewShiftInState({ location: val }) } }
          onChangeEnd={() => { this.updateNewShiftInRedux() } } />

        <Input
          label={"client"}
          value={client}
          onChange={val => { this.updateNewShiftInState({ client: val }) } }
          onChangeEnd={() => { this.updateNewShiftInRedux() } } />

      </div>
    )
  }

  public render() {
    const {
      shiftBeingCreated
    } = this.props

    return <div>
      {this.renderModeChange()}
      <AutoComplete label={"La"} value={""} onChange={() => { } } />
      {this.renderNewShiftEditor()}
    </div>
  }
}

const mapStateToProps: MapStateToProps<Props, any> = (state: RState, ownProps: Props) => {
  return {
    shiftBeingCreated: getShiftBeingCreated(state)
  }
}

export default connect(mapStateToProps)(ShiftEditor)
