import * as React from 'react'

import { compose } from 'redux'

import { Range } from 'moment'

import {
  MapStateToProps,
  connect,
} from 'react-redux'

import {
  Accordion,
  PaneContent,
  PaneHeader,
  PaneSidebar,
} from 'src/shared/components'

import {
  GeneralInspector,
  InspectorBreakdown,
  RState,
  Shift
} from 'src/models'

import { getCurrentTimeRange, } from 'src/state/calendar'
import { getInspectorGeneralData } from 'src/state/entities'

interface Props {
  generalInspector: GeneralInspector
  currTimeRange: Range
}


const Header = (props: Props) => <PaneHeader>Jan 15, 2017 {props.currTimeRange.toString()} </PaneHeader>

const EntityDetailsHeader = () => (
  <li>
    <div className="tablerow">
      <span className="tableitem">Hours</span>
      <span className="tableitem">Type</span>
    </div>
  </li>
)

const EntityDetails = (props: Props) => {
  return Object.keys(props.generalInspector.breakdown).map((entityType, i) => {
    const entity = props.generalInspector.breakdown[entityType]

    return <li key={i}>
      <Accordion>
        <div className="tablerow">
          <span className="tableitem">{Object.keys(entity).length} </span>
          <span className="tableitem">{entityType}</span>
        </div>

        <ul>
          {Object.keys(entity).map((id, j) => (
            <li key={j}>
              <span className="tableitem">{entity[id].totalDuration / 60}</span>
              <span className="tableitem">{entity[id].entity.alias}</span>
            </li>
          ))}
        </ul>

      </Accordion>
    </li>
  })
}

const shiftCount = (shifts: Shift[]) => <h4><strong>{shifts.length}</strong> Shifts</h4>
const totalDuration = (_totalDuration: number) => <h4><strong>{_totalDuration / 60}</strong> Hours</h4>
const Overview = (props: Props) => (
  <div>
    {shiftCount(props.generalInspector.shifts)}
    {totalDuration(props.generalInspector.totalDuration)}
  </div>
)

const Inspector = (props: Props) => (
  <PaneSidebar >
    <Header {...props} />
    <PaneContent>
      <div>
        <Overview {...props} />
        <ul>
          <EntityDetailsHeader />
          {EntityDetails(props) }
        </ul>
      </div>
    </PaneContent>
  </PaneSidebar >
)

const mapStateToProps: MapStateToProps<Props, RState> = (state: RState, ownProps: Props) => {
  return {
    generalInspector: getInspectorGeneralData(state),
    currTimeRange: getCurrentTimeRange(state)
  }
}

export default connect(mapStateToProps)(Inspector)
