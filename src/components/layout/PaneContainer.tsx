declare function require(s: any): any
import * as React from 'react';
import { Component, PropTypes } from 'react';

import CSSModules from 'react-css-modules';
const styles = require('./PaneContainer.css');

interface Props {
  children?: React.ReactChild
}

const PaneContainer = ({children = null}: Props) => {
  console.log(styles.container)
  return (
    <div className={styles.container}>
      {children}
      <h1 className={styles.h}>asfdf</h1>
    </div >
  );
}

export default PaneContainer
