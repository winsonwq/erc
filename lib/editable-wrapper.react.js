import React from 'react';
import cx from 'classnames';

class EditableWrapper extends React.Component {

  constructor(props) {
    super(props);
  }

  renderEditBtn() {
    return <button className="edit-mode-button">编辑</button>;
  }

  renderConfirmBtn() {
    return <button className="edit-mode-button" onClick={ this.props.onConfirmEditMode }>确定</button>;
  }

  renderCancelBtn() {
    return <button className="edit-mode-button" onClick={ this.props.onCancelEditMode }>取消</button>;
  }

  renderEditBg() {
    return <span className="editable-wrapper-bg"></span>;
  }

  renderEditContent() {
    const { editable, editMode } = this.props;

    if (editable) {
      if (!editMode) {
        return (
          <span className="editable-wrapper-content non-editmode" onClick={ this.props.onSwitchToEditMode }>
            { this.renderEditBg() }
            { this.renderEditBtn() }
          </span>
        );
      } else {
        return (
          <span className="editable-wrapper-content editmode">
            { this.renderConfirmBtn() }
            { this.renderCancelBtn() }
          </span>
        );
      }
    }

    return null;

  }

  render() {

    const { children, className, tagName, editMode } = this.props;
    const clazz = cx('editable-wrapper', { 'editmode': editMode }, className);

    return React.createElement(tagName, { className: clazz },
      children,
      this.renderEditContent());

  }

}

EditableWrapper.propTypes = {
  tagName: React.PropTypes.string,
  editable: React.PropTypes.bool,
  onSwitchToEditMode: React.PropTypes.func,
  onConfirmEditMode: React.PropTypes.func,
  onCancelEditMode: React.PropTypes.func
};

EditableWrapper.defaultProps = {
  editable: false
};

export default EditableWrapper;
