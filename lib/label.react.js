import React from 'react';
import assign from 'object-assign';
import cx from 'classnames';
import R  from 'ramda';

import M from './mixin';
import Basic from './mixins/basic';

import EditableWrapper from './editable-wrapper.react';
import Editor from './editor.react';

class Label extends M(Basic) {

  constructor(props) {
    super(props);
    const { editable, editMode } = props;
    this.state = assign({}, this.state, { editable, editMode });
  }

  handleTextChange(evt) {
    this.setState({ willBeText: evt.target.value });
  }

  handleConfirmEditMode() {
    const { data, willBeText, dataChange$ } = this.state;
    const { onChange } = this.props;

    this.setState({ data: willBeText, willBeText: '', editMode: false });

    if (data != willBeText) {
      dataChange$.subscribe(onChange || R.T);
      dataChange$.onNext({ data: willBeText });
    }
  }

  handleCancelEditMode() {
    this.setState({ editMode: false });
  }

  handleSwitchToEditMode() {
    this.setState({ editMode: true, willBeText: this.state.text });
  }

  renderContent() {
    const { editMode, data } = this.state;
    if (editMode) {
      return <Editor className="label-editor" onChange={ this.handleTextChange.bind(this) } >{ data }</Editor>;
    }

    if (!data) {
      return <span className="label-placeholder">{ this.props.placeHolderText }</span>;
    }


    return <span>{ data }</span>;

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

  placeHolderText: React.PropTypes.string
};

Label.defaultProps = {
  editable: true,
  tagName: 'span',
  placeHolderText: 'Add text'
};

export default Label;
