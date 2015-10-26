import ReactDOM from 'react-dom';
import R from 'ramda';

import Label from '../../lib/label.react';
import Panel from '../../lib/panel.react';
import List from '../../lib/list.react';

class Header extends Panel {

  render() {
    return (
      <div>
        <Label { ...this.prop('title') } tagName="h1" editable={ true } />
        <Label { ...this.prop('content') } tagName="p" editable={ true } className="styled-label" />
      </div>
    );
  }
}

class SimpleListItem extends Panel {
  render() {
    return (
      <Label { ...this.prop('title') } className="simple-list-item" tagName="div" editable={ true } />
    );
  }
}


class App extends Panel {

  render() {
    return (
      <div>
        <Header { ...this.prop('header') } />
        <Label { ...this.prop('description') } tagName="p" editable={ true } />
        <List { ...this.prop('listData') } itemTemplate={ SimpleListItem } />
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

  listData: [
    { title: 'hello1' },
    { title: 'hello2' }
  ]
};

ReactDOM.render(
  <App data={ data } onChange={ R.compose(print, R.prop('data')) } />,
  document.querySelector('#app')
);
