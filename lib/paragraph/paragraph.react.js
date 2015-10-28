import React from 'react';

import M from '../mixin';
import Basic from '../mixins/basic';
import EditMode from '../mixins/edit-mode';

import Editor from '../editor.react';

class Paragraph extends M(Basic, EditMode) {

  handleTextChange(evt) {
    this.setState({ willBeData: evt.target.value });
  }

  renderContent() {
    const { editMode, data } = this.state;
    if (editMode) {
      return <Editor className="paragraph-editor" onChange={ this.handleTextChange.bind(this) } >{ data }</Editor>;
    }

    if (!data) {
      return <span className="paragraph-placeholder">{ this.props.placeholder }</span>;
    }

    return <span dangerouslySetInnerHTML={ { __html: data } }></span>;
  }

  render() {
    return this.renderWith(null, 'erc-paragraph');
  }

}

Paragraph.propTypes = {
  onChange: React.PropTypes.func,
  editable: React.PropTypes.bool,

  placeholder: React.PropTypes.string
};

Paragraph.defaultProps = {
  editable: true,
  tagName: 'p',
  placeholder: 'Add text'
};

export default Paragraph;
