import ReactDOM from 'react-dom';
import R from 'ramda';

import Label from '../../lib/label.react';

import M from '../../lib/mixin';
import Panel from '../../lib/mixins/panel';

class App extends M(Panel) {

  render() {
    return (
      <div>
        <Label ref="title" tagName="h1" editable={ true } >
          hello
        </Label>
        <Label ref="content" tagName="p" editable={ true } className="styled-label">
          world
        </Label>
      </div>
    );
  }
}

function print(val) {
  console.log(val);
}

ReactDOM.render(<App onChange={ R.compose(print, R.prop('data')) }/>, document.querySelector('#app'));
