import React from 'react';
import cx from 'classnames';
import R from 'ramda';

import M from '../mixin';
import Basic from '../mixins/basic';
import EditMode from '../mixins/edit-mode';

class Paragraph extends M(Basic, EditMode) {

  handleTextChange(innerHTML) {
    this.setState({ willBeData: innerHTML });
  }

  renderContent() {
    const { editable } = this.props;
    const { data } = this.state;
    return (
      <div className={ cx({ 'paragraph-editor': editable }) }
        contentEditable={ editable }
        dangerouslySetInnerHTML={ { __html: data } }
        onKeyUp={ R.compose(this.handleTextChange, R.path('target.innerHTML'.split('.'))).bind(this) }
        onBlur={ this.handleConfirmEditMode.bind(this) }
        onFocus={ this.handleSwitchToEditMode.bind(this) }></div>
    );
  }

  render() {
    const { className, tagName } = this.props;

    return React.createElement(tagName, { className: cx(className, 'erc-paragraph') },
      this.renderContent()
    );
  }

}

Paragraph.propTypes = {
  onChange: React.PropTypes.func,
  editable: React.PropTypes.bool,

  placeholder: React.PropTypes.string
};

Paragraph.defaultProps = {
  editable: true,
  tagName: 'div',
  placeholder: 'Add text'
};

export default Paragraph;
