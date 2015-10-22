import React from 'react';
import assign from 'object-assign';
import cx from 'classnames';

import EditableWrapper from './editable-wrapper.react';
import Editor from './editor.react';

class Label extends React.Component {

  constructor(props) {
    super(props);
    const { children, editable, editMode } = props;
    this.state = assign({}, this.state, { text: children, editable, editMode });
  }

  handleTextChange(evt) {
    this.setState({ willBeText: evt.target.value });
  }

  handleConfirmEditMode() {
    this.setState({ text: this.state.willBeText, willBeText: '', editMode: false });
  }

  handleCancelEditMode() {
    this.setState({ editMode: false });
  }

  handleSwitchToEditMode() {
    this.setState({ editMode: true, willBeText: this.state.text });
  }

  renderContent() {
    const { editMode, text } = this.state;
    if (editMode) {
      return <Editor className="label-editor" onChange={ this.handleTextChange.bind(this) } >{ text }</Editor>;
    }
    return <span>{ text }</span>;
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
  children: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  editable: React.PropTypes.bool
};

Label.defaultProps = {
  tagName: 'span'
};

export default Label;
