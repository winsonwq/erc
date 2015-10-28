import React from 'react';
import cx from 'classnames';

import M from '../mixin';
import Basic from '../mixins/basic';
import EditMode from '../mixins/edit-mode';

import EditableWrapper from '../editable-wrapper.react';
import Editor from '../editor.react';

class Label extends M(Basic, EditMode) {

  handleTextChange(evt) {
    this.setState({ willBeData: evt.target.value });
  }

  renderContent() {
    const { editMode, data } = this.state;
    if (editMode) {
      return <Editor className="label-editor" onChange={ this.handleTextChange.bind(this) } >{ data }</Editor>;
    }

    if (!data) {
      return <span className="label-placeholder">{ this.props.placeholder }</span>;
    }

    return <span dangerouslySetInnerHTML={ { __html: data } }></span>;
  }

  render() {
    const { tagName, editable, className } = this.props;
    const { editMode } = this.state;

    return (
      <EditableWrapper { ...{ tagName, className: cx(className, 'label'), editable, editMode } }

        onSwitchToEditMode={ this.handleSwitchToEditMode.bind(this) }
        onCancelEditMode={ this.handleCancelEditMode.bind(this) }
        onConfirmEditMode={ this.handleConfirmEditMode.bind(this) }>

        { this.renderContent() }

      </EditableWrapper>
    );
  }

}

Label.propTypes = {
  onChange: React.PropTypes.func,
  editable: React.PropTypes.bool,

  placeholder: React.PropTypes.string
};

Label.defaultProps = {
  editable: true,
  tagName: 'p',
  placeholder: 'Add text'
};

export default Label;
