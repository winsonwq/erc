import ReactDOM from 'react-dom';
import R from 'ramda';

import Label from '../../lib/label.react';
import Img from '../../lib/img/img.react';
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
        <List { ...this.prop('listData') }
          itemTemplate={ ListItem }
          itemPlaceholder={ { title: '百度', logo: { src: 'https://www.baidu.com/img/bd_logo1.png' } } }
          />
      </div>
    );
  }
}

class ListItem extends Panel {
  render() {
    return (
      <div className="simple-list-item">
        <Img { ...this.prop('logo') } srcFieldLabel="图片地址" altFieldLabel="图片说明" />
        <Label { ...this.prop('title') } tagName="div" />
      </div>
    );
  }
}

class App extends Panel {

  render() {
    const bigItemPlaceholder = {
      listTitle: '标题',
      listData: [{
        title: '子标题',
        logo: { src: 'https://www.baidu.com/img/bd_logo1.png' }
      }]
    };

    return (
      <div className="erc">
        <Header { ...this.prop('header') } />
        <Label { ...this.prop('description') } tagName="p" />
        <List { ...this.prop('bigListData') } className="big-list" itemTemplate={ BigItem } itemPlaceholder={ bigItemPlaceholder} />
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
        {
          title: 'title 1',
          logo: {
            src: 'https://www.baidu.com/img/bd_logo1.png'
          }
        },
        {
          title: 'title 1',
          logo: {
            src: 'https://www.baidu.com/img/bd_logo1.png'
          }
        }
      ]
    }
  ]
};

ReactDOM.render(
  <App data={ data } onChange={ R.compose(print, R.prop('data')) } />,
  document.querySelector('#app')
);
