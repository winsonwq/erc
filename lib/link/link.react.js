
import React from 'react';

import M from '../mixin';
import Basic from '../mixins/basic';
import EditMode from '../mixins/edit-mode';

class Link extends M(Basic, EditMode) {

  renderContent() {

    const { editMode, data, willBeData } = this.state;
    const { hrefFieldLabel, altFieldLabel, textFieldLabel, targetFieldLabel } = this.props;

    if (editMode) {
      return (
        <div className="erc-editor erc-link-editor">
          <p>
            <label>
              <span>{ textFieldLabel }</span>
              <input type="text" onChange={ this.handlePropChangeFromTargetValue('text').bind(this) } defaultValue={ willBeData.text } />
            </label>
          </p>
          <p>
            <label>
              <span>{ hrefFieldLabel }</span>
              <input type="text" onChange={ this.handlePropChangeFromTargetValue('href').bind(this) } defaultValue={ willBeData.href } />
            </label>
          </p>
          <p>
            <label>
              <span>{ altFieldLabel }</span>
              <input type="text" onChange={ this.handlePropChangeFromTargetValue('alt').bind(this) } defaultValue={ willBeData.alt } />
            </label>
          </p>
          <p>
            <label>
              <span>{ targetFieldLabel }</span>
              <input type="checkbox" onChange={ this.handlePropChangeFromTarget('target', 'target.checked').bind(this) } defaultChecked={ willBeData.target } />
            </label>
          </p>
        </div>
      );
    }

    return <a className="erc-link" href={ data.href } alt={ data.alt } target={ data.target ? '_blank' : '_self' }>{ data.text }</a>;
  }

  render() {
    return this.renderWith(null, 'erc-link-wrapper');
  }

}

Link.propTypes = {

  onChange: React.PropTypes.func,
  editable: React.PropTypes.bool,

  hrefFieldLabel: React.PropTypes.string,
  altFieldLabel: React.PropTypes.string,
  textFieldLabel: React.PropTypes.string,
  targetFieldLabel: React.PropTypes.string,

  data: React.PropTypes.shape({
    href: React.PropTypes.string,
    alt: React.PropTypes.string,
    text: React.PropTypes.string,
    target: React.PropTypes.string
  })
};

Link.defaultProps = {
  editable: true,
  hrefFieldLabel: 'Link URL:',
  altFieldLabel: 'Alt:',
  textFieldLabel: 'Text:',
  targetFieldLabel: 'Target:'
};

export default Link;
