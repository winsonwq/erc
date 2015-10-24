import React from 'react';

class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillMount() {}
  componentWillReceiveProps() {}
  componentWillUpdate() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() { return null; }
}

export default function(...mixins) {
  return mixins.reduce((sofar, curr) => curr(sofar), BaseComponent);
}
