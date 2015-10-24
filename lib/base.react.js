import React from 'react';
import Rx from 'rx';

class Base extends React.Component {

  constructor(props) {
    super(props);
    this.state = { dataChange$: new Rx.Subject(), __editableComponent: true };
  }

  getValue() {
    return { data: this.state.data };
  }

  render() { return null; }

}

export default Base;
