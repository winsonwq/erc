import React from 'react';

import M from '../mixin';
import Basic from '../mixins/basic';
import EditMode from '../mixins/edit-mode';

class Img extends M(Basic, EditMode) {

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
              <input type="text" onChange={ this.handlePropChangeFromTargetValue('src').bind(this) } defaultValue={ willBeData.src } />
            </label>
          </p>
          <p>
            <label>
              <span>{ altFieldLabel }</span>
              <input type="text" onChange={ this.handlePropChangeFromTargetValue('alt').bind(this) } defaultValue={ willBeData.alt } />
            </label>
          </p>
        </div>
      );
    }

    return <img className="erc-image" src={ data.src } alt={ data.alt } />;
  }

  render() {
    return this.renderWith('div', 'erc-image-wrapper');
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
