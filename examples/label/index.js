import ReactDOM from 'react-dom';
import Label from '../../lib/label.react';

const label = (
  <div>
    <Label name="labelValue" tagName="h1" editable={ true } >
      hello
    </Label>
    <Label name="labelValue" tagName="p" editable={ true }>
      world
    </Label>
  </div>
);

ReactDOM.render(label, document.querySelector('#app'));
