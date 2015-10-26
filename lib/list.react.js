import React from 'react';
import cx from 'classnames';

import M from './mixin';

import Basic from './mixins/basic';
import MergedListDataChange from './mixins/merge-list-data-change';

class List extends M(Basic, MergedListDataChange) {

  renderListItems() {
    const Item = this.props.itemTemplate;
    const { data } = this.props;

    return data.map(function(d, idx) {
      return <Item key={ JSON.stringify(d) } ref={ `item${idx}` } data={ d }/>;
    });
  }

  render() {

    const { tagName, className } = this.props;
    const clazz = cx('list', className);

    return React.createElement(tagName, { className: clazz }, this.renderListItems());
  }

}

List.propTypes = {
  itemTemplate: React.PropTypes.func.isRequired,
  data: React.PropTypes.array,
  tagName: React.PropTypes.string
};

List.defaultProps = {
  data: [1],
  tagName: 'div'
};

export default List;
