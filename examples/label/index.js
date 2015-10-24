import ReactDOM from 'react-dom';
import R from 'ramda';

import Label from '../../lib/label.react';
import Panel from '../../lib/panel.react';


class App extends Panel {

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
