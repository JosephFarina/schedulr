import * as React from 'react'

const styles = require('./Loading.scss')
const ctx = require('classnames')

interface LoadingProps {

}

const defaultProps: LoadingProps = {

}

const Loading: React.StatelessComponent<LoadingProps> = (props: LoadingProps) => {
  const { } = props

  const klass = ctx({

  })

  return (
    <div className={styles.loading}>
      <div className={styles.loadingBar}></div>
      <div className={styles.loadingBar}></div>
      <div className={styles.loadingBar}></div>
      <div className={styles.loadingBar}></div>
    </div>
  )
}

Loading.defaultProps = defaultProps

export { Loading }
