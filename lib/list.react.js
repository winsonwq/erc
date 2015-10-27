import React from 'react';
import cx from 'classnames';

import M from './mixin';

import Basic from './mixins/basic';
import MergedListDataChange from './mixins/merge-list-data-change';

class List extends M(Basic, MergedListDataChange) {

  handleAddItem() {
    this.setState({ data: this.state.data.concat({}) });
  }

  componentDidUpdate() {
    this.subscribeChange();
  }

  renderListItems() {
    const Item = this.props.itemTemplate;
    const { editable } = this.props;
    const { data } = this.state;

    return data.map(function(d, idx) {
      return <Item editable={ editable } key={ JSON.stringify(d) + Date.now() } ref={ `item${idx}` } data={ d } />;
    }.bind(this));
  }

  renderActionBar() {
    return (
      <div className="list-action-bar">
        <button className="edit-mode-button" onClick={ this.handleAddItem.bind(this) }>添加</button>
      </div>
    );
  }

  render() {

    const { tagName, className } = this.props;
    const clazz = cx('editable-list', className);

    return React.createElement(tagName, { className: clazz },
      this.renderListItems(),
      this.renderActionBar()
    );
  }

}

List.propTypes = {
  itemTemplate: React.PropTypes.func.isRequired,
  data: React.PropTypes.array,
  tagName: React.PropTypes.string,
  editable: React.PropTypes.bool
};

List.defaultProps = {
  data: [{}],
  tagName: 'div',
  editable: true
};

export default List;
