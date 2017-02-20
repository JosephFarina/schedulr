import * as React from 'react'
import { Entity } from 'src/models'
import { EditableText } from 'src/shared'

const styles = require('./EmployeeDetailsEditor.scss')

const Field = (props) => (
  <div className={styles.field}>
    <strong className={styles.text}>{props.fieldName}: </strong>
    <div className={styles.input}><EditableText {...props} value={props.value ? props.value : 'Not set'} /></div>
  </div>
)

interface Props {
  fields?: {
    fieldName: string
    display?: string
    value: string,
    selectOptions?: Entity[]
  }[]
  onChange: (val: string) => any
}

const EmployeeDetailsEditor = (props: Props) => {
  const {fields, onChange} = props
  return <div>
    {fields.map(field => <Field {...field} onChange={onChange} />)}
  </div>
}

export default EmployeeDetailsEditor
