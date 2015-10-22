
import React from 'react';

export default class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: props.children };
  }

  render() {
    const { text } = this.state;
    const { className } = this.props;

    return (
      <textarea className={ className } defaultValue={ text } onChange={ this.props.onChange }></textarea>
    );
  }

}

Editor.propTypes = {
  children: React.PropTypes.string,
  onChange: React.PropTypes.func
};

Editor.defaultProps = {
  children: ''
};
