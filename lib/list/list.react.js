import React from 'react';
import cx from 'classnames';
import R from 'ramda';

import Guid from '../guid';

import M from '../mixin';
import Composite from '../mixins/composite';

class List extends M(Composite) {

  handleAddItem() {
    const placeHolder = this.props.itemPlaceholder || {};
    this.setState({ data: this.state.data.concat(placeHolder) });
    this.triggerChange();
  }

  handleRemoveItem(idx) {
    return function() {
      this.setState({ data: this.state.data.filter((d, i) => i != idx) });
      this.triggerChange();
    }.bind(this);
  }

  componentDidUpdate() {
    this.subscribeChange();
  }

  getMergedDataChange() {
    return super.getMergedDataChange().map(R.values);
  }

  renderListItems() {
    const Item = this.props.itemTemplate;
    const { editable, itemTagName } = this.props;
    const { data } = this.state;

    return data.map(function(d, idx) {
      return React.createElement(itemTagName, { className: 'erc-list-item', key: Guid() },
        <Item editable={ editable } ref={ `list-item-${idx}` } data={ d } />,
        this.renderItemActions(d, idx)
      );
    }.bind(this));
  }

  renderItemActions(d, idx) {
    return (
      <div className="erc-list-item-action-bar">
        <button className="edit-mode-button" onClick={ this.handleRemoveItem(idx) }>删除</button>
      </div>
    );
  }

  renderActionBar() {
    const { editable } = this.props;
    if (!editable) return null;
    return (
      <div className="erc-list-action-bar">
        <button className="edit-mode-button" onClick={ this.handleAddItem.bind(this) }>添加</button>
      </div>
    );
  }

  renderList() {
    const { tagName } = this.props;
    return React.createElement(tagName, { className: 'erc-list' }, this.renderListItems());
  }

  render() {
    const { className } = this.props;
    const clazz = cx('erc-list-wrapper', className);

    return (
      <div className={ clazz }>
        { this.renderList() }
        { this.renderActionBar() }
      </div>
    );
  }

}

List.propTypes = {
  itemTemplate: React.PropTypes.func.isRequired,
  itemPlaceholder: React.PropTypes.object.isRequired,
  data: React.PropTypes.array,
  tagName: React.PropTypes.string,
  itemTagName: React.PropTypes.string,
  editable: React.PropTypes.bool
};

List.defaultProps = {
  data: [{}],
  tagName: 'div',
  itemTagName: 'div',
  editable: true
};

export default List;
