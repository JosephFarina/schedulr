import * as React from 'react'

const styles = require('./Panel.scss')

interface Props {
  title: string
  body: JSX.Element
}

export const PanelCard = (props) => (
  <div className={styles.card}>{props.children}</div>
)

export class Panel extends React.Component<Props, any> {
  render() {
    const {title, body} = this.props
    return <div>
      <div className={styles.header}>
        <h3>
          <strong>{title}</strong>
        </h3>
      </div>
      <div className={styles.body}><PanelCard>{body}</PanelCard></div>
    </div>
  }
}


export const PanelColumn = (props) => (
  <div className={styles.column}>{props.children}</div>
)

export const PanelContainer = (props) => (
  <div className={styles.container}>{props.children}</div>
)
