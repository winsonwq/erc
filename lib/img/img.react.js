import React from 'react';
import R from 'ramda';
import cx from 'classnames';

import M from '../mixin';
import Basic from '../mixins/basic';
import EditMode from '../mixins/edit-mode';

import EditableWrapper from '../editable-wrapper.react';

class Img extends M(Basic, EditMode) {

  handleImagePropChange(propName) {
    return function(evt) {
      const data = R.merge(this.state.willBeData, R.zipObj([propName], [evt.target.value]));
      this.setState({ willBeData: data });
    };
  }

  renderContent() {
    const { editMode, data, willBeData } = this.state;
    const { srcFieldLabel, altFieldLabel } = this.props;

    if (editMode) {
      return (
        <div className="erc-editor erc-image-editor">
          <p className="erc-image-preview-wrapper">
            <img className="erc-image-preview" src={ willBeData.src } alt={ willBeData.alt } />
          </p>
          <p>
            <label>
              <span>{ srcFieldLabel }</span>
              <input type="text" onChange={ this.handleImagePropChange('src').bind(this) } defaultValue={ willBeData.src } />
            </label>
          </p>
          <p>
            <label>
              <span>{ altFieldLabel }</span>
              <input type="text" onChange={ this.handleImagePropChange('alt').bind(this) } defaultValue={ willBeData.alt } />
            </label>
          </p>
        </div>
      );
    }

    return <img className="erc-image" src={ data.src } alt={ data.alt } />;
  }

  render() {
    const { editable, className } = this.props;
    const { editMode } = this.state;

    return (
      <EditableWrapper { ...{ tagName: 'div', className: cx(className, 'erc-image-wrapper'), editable, editMode } }

        onSwitchToEditMode={ this.handleSwitchToEditMode.bind(this) }
        onCancelEditMode={ this.handleCancelEditMode.bind(this) }
        onConfirmEditMode={ this.handleConfirmEditMode.bind(this) }>

        { this.renderContent() }
      </EditableWrapper>
    );
  }

}

Img.propTypes = {

  onChange: React.PropTypes.func,
  editable: React.PropTypes.bool,

  srcFieldLabel: React.PropTypes.string,
  altFieldLabel: React.PropTypes.string,

  data: React.PropTypes.shape({
    src: React.PropTypes.string,
    alt: React.PropTypes.string
  })
};

Img.defaultProps = {
  editable: true,
  srcFieldLabel: 'Image Url:',
  altFieldLabel: 'Alt:'
};

export default Img;
