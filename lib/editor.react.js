
import React from 'react';
import cx from 'classnames';

export default class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: props.children };
  }

  handleKeyUp(evt) {
    const { onChange } = this.props;
    onChange && onChange(evt.target.innerHTML);
  }

  render() {
    const { text } = this.state;
    const { className, placeholder } = this.props;

    return (
      <div className={ cx('erc-editor', className) }
        contentEditable={ true }
        dangerouslySetInnerHTML={ { __html: text || placeholder } }
        onKeyUp={ this.handleKeyUp.bind(this) }>
      </div>
    );
  }

}

Editor.propTypes = {
  onChange: React.PropTypes.func,
  placeholder: React.PropTypes.string
};

Editor.defaultProps = {
  children: '',
  placeholder: 'Enter ...'
};
