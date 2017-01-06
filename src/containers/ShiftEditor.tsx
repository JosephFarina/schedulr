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
} from './../state/shift'

import Button from './../components/buttons/Button'
import ButtonGroup from './../components/buttons/ButtonGroup'
import AutoComplete from './../components/inputs/AutoComplete'
import Input from './../components/inputs/Input'

interface Props {
  dispatch?: Function
  editMode?: boolean // mode === 'editMode'
  newMode?: boolean // mode ==='newMode'
  shiftSelected?: boolean

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
    shiftSelected: false,
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
      shiftBeingCreated: {} as Shift
    }
  }

  /**
   * 
   * Renderers
   * 
   */

  private renderModeChange() {
    const {
      handleModeChange,
      shiftSelected,
      editMode,
      newMode,
    } = this.props

    if (shiftSelected) {
      return (
        <ButtonGroup centered={true}>
          <Button onClick={() => handleModeChange('newShift')} active={newMode} mini={true} >New</Button>
          <Button onClick={() => handleModeChange('editShift')} active={editMode} mini={true} >Edited</Button>
        </ButtonGroup>
      )
    } else {
      return null
    }
  }

  public render() {
    return <div>
      {this.renderModeChange()}
      <AutoComplete label={"La"} value={""} onChange={() => { } } />
      <Input onChangeEnd={() => { console.log('change end') } } label={"La"} value={""} onChange={() => { } } />
      <Input label={"La"} value={""} onChange={() => { } } />
      <Input label={"La"} value={""} onChange={() => { } } />
      <Input label={"La"} value={""} onChange={() => { } } />
      <Input label={"La"} value={""} onChange={() => { } } />
    </div>
  }
}

const mapStateToProps: MapStateToProps<any, any> = (state: RState, ownProps: Props) => {
  return state
}

export default connect(mapStateToProps)(ShiftEditor)
