import ReactDOM from 'react-dom';
import R from 'ramda';

import Label from '../../lib/label.react';

import M from '../../lib/mixin';
import Panel from '../../lib/mixins/panel';

class Header extends M(Panel) {

  render() {
    const { title, content } = this.props.data;
    return (
      <div>
        <Label ref="title" tagName="h1" editable={ true } >
          { title }
        </Label>
        <Label ref="content" tagName="p" editable={ true } className="styled-label">
          { content }
        </Label>
      </div>
    );
  }
}

class App extends M(Panel) {

  render() {

    const { header, description } = this.props.data;

    return (
      <div>
        <Header ref="header" data={ header }/>
        <Label ref="description" tagName="p" editable={ true } >
          { description }
        </Label>
      </div>
    );
  }

}

function print(val) {
  console.log(val);
}

const data = {
  header: {
    title: 'hello',
    content: 'world'
  },

  description: 'description'
};

ReactDOM.render(<App data={ data } onChange={ R.compose(print, R.prop('data')) } />, document.querySelector('#app'));
