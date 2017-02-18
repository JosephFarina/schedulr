import * as React from 'react'

import { } from 'src/models'

const styles = require('./Toolbar.scss')

interface Props {
  dispatch?: Function
  children?: any
}

export const Toolbar: React.StatelessComponent<Props> = (props: Props) => <div className={styles.toolbar}>{props.children}</div>
