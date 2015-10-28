
import React from 'react';
import cx from 'classnames';

export default class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: props.children };
  }

  render() {
    const { text } = this.state;
    const { className } = this.props;

    return (
      <span className={ cx('erc-editor', className) }>
        <textarea defaultValue={ text } onChange={ this.props.onChange }></textarea>
      </span>
    );
  }

}

Editor.propTypes = {
  onChange: React.PropTypes.func
};

Editor.defaultProps = {
  children: ''
};
