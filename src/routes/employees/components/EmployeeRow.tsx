import * as React from 'react'

import * as ReactTooltip from 'react-tooltip'
import { } from 'src/models'

const styles = require('./EmployeeRow.scss')
const ctx = require('classnames')

interface Props {
  dispatch?: Function
  fields?: {
    imageUrl?: string
    firstName?: string
    lastName?: string
    position?: string
    manager?: boolean
  }
}

const EmployeeRow: React.StatelessComponent<Props> = (props: Props) => {
  const {fields} = props
  const {
    imageUrl,
    firstName,
    lastName,
    manager,
    position
  } = fields

  const klass = ctx({})

  return (
    <li className={styles.item}>
      <div className={styles.imageContainer}>
        <img className={styles.avatar} src={imageUrl} alt="" />
      </div>

      {/*TODO:*/}
      {/*add tooltips to each item*/}
      {/*figure out how the data is gonna be put together 
      employees will be stored normalized in the redux store but how will 
      it go through and organize employees by managers efficiently*/}

      <div className={styles.fields}>
        <div data-tip data-for={`messageForFirstName`} className={styles.field}>
          <div className={styles.fieldTitle}>First Name</div>
          <div className={styles.fieldValue}>{firstName}</div>
        </div>

        <ReactTooltip id={`messageForFirstName`} place="bottom" >
          {firstName}
        </ReactTooltip>

        <div data-tip data-for={`messageForLastName`} className={styles.field}>
          <div className={styles.fieldTitle}>Last Name</div>
          <div className={styles.fieldValue}>{lastName}</div>
        </div>

        <ReactTooltip id={`messageForLastName`} place="bottom" >
          {lastName}
        </ReactTooltip>

        <div className={styles.field}>
          <div className={styles.fieldTitle}>Position</div>
          <div className={styles.fieldValue}>{position}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.fieldTitle}>Manager</div>
          <div className={styles.fieldValue}>{manager ? 'Yes' : 'No'}</div>
        </div>
      </div>

    </li>
  )
}

const defaultProps: Props = {
  fields: {
    imageUrl: "http://lh4.ggpht.com/7C4cbRPUtLgWxvmEPvNAZeGD5pbGivLZweEzBQU8o5j8NyGz5l-X_dYFwL9p-K1UzBQXjotVZi8PEpW1LUk8ORs=s0",
    firstName: 'Joey',
    lastName: 'Farina',
    manager: true,
    position: 'Line Cook'
  }
}

EmployeeRow.defaultProps = defaultProps

export default EmployeeRow
