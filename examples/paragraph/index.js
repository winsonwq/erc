import ReactDOM from 'react-dom';
import R from 'ramda';

import Paragraph from '../../lib/paragraph/paragraph.react';
import Img from '../../lib/img/img.react';
import Link from '../../lib/link/link.react';
import Panel from '../../lib/panel/panel.react';
import List from '../../lib/list/list.react';

class Header extends Panel {

  render() {
    return (
      <div>
        <Paragraph { ...this.prop('title') } tagName="h1" />
        <Paragraph { ...this.prop('content') } className="styled-label" />
      </div>
    );
  }
}

class BigItem extends Panel {
  render() {
    return (
      <div className="big-list-item">
        <Paragraph { ...this.prop('listTitle') } />
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
        <Paragraph { ...this.prop('title') } tagName="div" />
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
        <Paragraph { ...this.prop('description') } />
        <List { ...this.prop('bigListData') } className="big-list" itemTemplate={ BigItem } itemPlaceholder={ bigItemPlaceholder} />
        <Link className="styled-btn" { ...this.prop('link') } tagName="span" hrefFieldLabel="链接地址" altFieldLabel="链接说明" textFieldLabel="文本" targetFieldLabel="在新标签页中打开？" />
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

  link: {
    href: 'http://baidu.com',
    alt: '这是一个链接',
    text: '这是百度的一个链接'
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
