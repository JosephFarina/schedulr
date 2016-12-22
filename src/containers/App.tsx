import * as React from 'react';
import { Component, PropTypes } from 'react';

import * as I from 'immutable'

import PaneContainer from './../components/layout/PaneContainer';

interface Props {

}

interface State {

}

class App extends Component<Props, State> {
  static proptypes = {

  }

  render() {
    const x = I.Map({
      a: 7,
      b: I.List.of(5, 1, 4, 5)
    })
    
    return (
      <PaneContainer>
        <div>asdfd</div>
      </PaneContainer>
    );
  }
}

export default App;
