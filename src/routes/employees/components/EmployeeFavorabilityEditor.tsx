import * as React from 'react'
import { UnnormalizedEmployeeFavorability } from 'src/models'

const ctx = require('classnames')
const styles = require('./EmployeeFavorabilityEditor.scss')

const Switch = require('antd/lib/switch')
const Icon = require('antd/lib/icon')
const Rate = require('antd/lib/rate')

interface EmployeeFavorabilityRowProps {
  employeeFavorabily: UnnormalizedEmployeeFavorability
  onChange: (id: string) => (key: 'rating' | 'canWorkWith') => (val: number) => any
}

const EmployeeFavorabilityRow = ({employeeFavorabily, onChange}: EmployeeFavorabilityRowProps) => (
  <div className={styles.row}>
    <div className={styles.rowItem}> {employeeFavorabily.client.alias} </div>
    <div className={styles.rowItem}>
      <Switch
        checkedChildren={<Icon type="like" />}
        unCheckedChildren={<Icon type="dislike" />}
        onChange={onChange(employeeFavorabily.id)('canWorkWith')}
        checked={employeeFavorabily.canWorkWith}
      />
    </div>
    <div className={styles.rowItem}>
      <Rate
        allowHalf
        value={employeeFavorabily.rating}
        onChange={onChange(employeeFavorabily.id)('rating')}
        disabled={!employeeFavorabily.canWorkWith}
      />
    </div>
  </div>
)

interface Props {
  employeeFavorabilies: UnnormalizedEmployeeFavorability[]
  onChange: (id: string) => (key: 'rating' | 'canWorkWith') => (val: number) => any
}

const EmployeeFavorabilityEditor = ({employeeFavorabilies, onChange}: Props) => (
  <div>
    <div className={ctx(styles.row, styles.header)}>
      <div className={styles.rowItem}>
        <strong>Client Name</strong>
      </div>
      <div className={styles.rowItem}>
        <strong>Works With</strong>
      </div>
      <div className={styles.rowItem}>
        <strong>Favorability</strong>
      </div>
    </div>
    {employeeFavorabilies.map(empFav => <EmployeeFavorabilityRow
      employeeFavorabily={empFav}
      onChange={onChange}
    />)}
  </div>
)

export default EmployeeFavorabilityEditor
