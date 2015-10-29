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
      <div className="header">
        <Paragraph { ...this.prop('siteName') } tagName="span" />
      </div>
    );
  }
}

class App extends Panel {
  render() {
    return (
      <div className="erc">
        <Header { ...this.prop('header') } />
        <article>
          <Paragraph { ...this.prop('title') } tagName="h1" />
          <h2>活动描述</h2>
          <Paragraph { ...this.prop('description') } tagName="section" />
          <div className="action-bar">
            <Link className="styled-btn" { ...this.prop('link') } tagName="span" hrefFieldLabel="链接地址" altFieldLabel="链接说明" textFieldLabel="文本" targetFieldLabel="在新标签页中打开？" />
          </div>
          <List { ...this.prop('imageListData') }
            className="image-list"
            itemTemplate={ ImageListItem }
            itemPlaceholder={ { imageInfo: { src: 'http://placehold.it/500x400' }, imageDesc: '图片说明' } }
            />
        </article>
      </div>
    );
  }
}

class ImageListItem extends Panel {
  render() {
    return (
      <div className="image-list-item">
        <Img { ...this.prop('imageInfo') } srcFieldLabel="图片地址" altFieldLabel="图片说明" className="image" />
        <Paragraph { ...this.prop('imageDesc') } />
      </div>
    );
  }
}

const data = {
  header: {
    siteName: '嘿啦运动'
  },
  title: '【清迈马拉松旅行】你挑战吗？',
  description: `
<p>今天，我们离开清迈，约4个小时的车程，踏上我们的金三角之旅。</p>
<p>上午，我们前往距离清迈70公里处的清道岩洞进行探寻。为了保存溶洞内的原貌，很多地方都没有照明领队会带煤油灯引路，穿越过蝙蝠栖息的小径，幽深远长，远离尘嚣。</p>

<p>继续车行，我们会来到泰药市场，真实感受当地人的生活。一般提起草药，人们一定会想起中草药，其实在世界上许多国家都有草药的历史，其中著名的有中国，印度，泰国等国家。泰国地处热带，一年四季阳光充足，气候适合多种奇特草药生长，因此泰国自然医学也相当发达，其中不乏泰国独有的草药比如：泰国野葛根，泰国艳紫铆，泰国莪术等上百种泰国独有的草药品种。</p>

<p>下午，我们到达塔通，一座位于泰缅边界的小镇，枕着湄公河的支流，安静的坐落在泰北。这是一个在地图上也无法标出的小镇，但是，从这里出发，我们可以进入泰北的核心。在这块神奇的土地上，自然风光秀美，但又和世人避之不及的万恶之源的毒品紧密相连；淳朴善良的山地民族聚居，却又夹杂着众多的“蒋匪余孽“和“难民”。在今天，当“金三角”这个名字已经日益摆脱其神秘的光环，走入大众的视线，甚至成为一个背包客的探索目的地的时候，让我们慢慢走入这块仍然常规游客罕至土地，开启一场真实的泰北金三角之旅。傍晚，我们登上塔通寺（Wat Tha Ton），一览夕阳之下的塔通全景，河流纵横，山势蜿蜒。让我们记得，我们脚下的这块土地，已经叫做金三角了。</p>`,
  link: {
    text: '立即参加'
  },
  imageListData: [
    {
      imageInfo: { src: 'https://mmbiz.qlogo.cn/mmbiz/aUibouqeyELyKBiarZSnBDFibS2VISkNT8DDiays0HTwNLn57XWWqAgkeUIIVtibSFQ2tzFBst61rqDOibg6NAFWQthw/0?wx_fmt=jpeg' },
      imageDesc: '深入泰北 - 塔通'
    },
    {
      imageInfo: { src: 'https://mmbiz.qlogo.cn/mmbiz/aUibouqeyELyKBiarZSnBDFibS2VISkNT8Dw2MRGSL9n43a1HSY3icSicWxEXKl3KnUfLT8CuzOKRicgciaquGKCd5YTQ/0?wx_fmt=jpeg' },
      imageDesc: '泛舟晨暮中'
    },
    {
      imageInfo: { src: 'https://mmbiz.qlogo.cn/mmbiz/aUibouqeyELyKBiarZSnBDFibS2VISkNT8D0P2Vxjce1unXqy3rscJEs6A6VWd31ToBRuFJHmdiatsxKmom9lRuyAQ/0?wx_fmt=jpeg' },
      imageDesc: '竹屋'
    },
    {
      imageInfo: { src: 'https://mmbiz.qlogo.cn/mmbiz/aUibouqeyELyKBiarZSnBDFibS2VISkNT8DjWsKf6YWlBFSQp5HDN1BMszic0SiaUicYSaoTpIlSQjkLzI8UZKLEghnw/0?wx_fmt=jpeg' },
      imageDesc: '农家饭'
    }
  ]
};

function print(val) {
  window.console.log(val);
}

ReactDOM.render(
  <App data={ data } onChange={ R.compose(print, R.prop('data')) } />,
  document.querySelector('#app')
);
