import ReactDOM from 'react-dom';
import R from 'ramda';

import Label from '../../lib/label.react';
import Panel from '../../lib/panel.react';
import List from '../../lib/list.react';

class Header extends Panel {

  render() {
    return (
      <div>
        <Label { ...this.prop('title') } tagName="h1" />
        <Label { ...this.prop('content') } tagName="p" className="styled-label" />
      </div>
    );
  }
}

class BigItem extends Panel {
  render() {
    return (
      <div className="big-list-item">
        <Label { ...this.prop('listTitle') } tagName="div" />
        <List { ...this.prop('listData') } itemTemplate={ ListItem } />
      </div>
    );
  }
}

class ListItem extends Panel {
  render() {
    return (
      <Label { ...this.prop('title') } className="simple-list-item" tagName="div" />
    );
  }
}


class App extends Panel {

  render() {
    return (
      <div className="erc">
        <Header { ...this.prop('header') } />
        <Label { ...this.prop('description') } tagName="p" />
        <List { ...this.prop('bigListData') } className="big-list" itemTemplate={ BigItem } />
      </div>
    );
  }

}

function print(val) {
  window.console.log(val);
}

const data = {
  header: {
    title: 'hello',
    content: 'world'
  },

  description: 'description',

  bigListData: [
    {
      listTitle: 'hello',
      listData: [
        { title: 'title 1' },
        { title: 'title 1' },
        { title: 'title 1' }
      ]
    },
    {
      listTitle: 'world',
      listData: [
        { title: 'title 2' },
        { title: 'title 2' },
        { title: 'title 2' }
      ]
    }
  ]
};

ReactDOM.render(
  <App data={ data } onChange={ R.compose(print, R.prop('data')) } />,
  document.querySelector('#app')
);
