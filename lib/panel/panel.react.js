
import R from 'ramda';
import M from '../mixin';

import Composite from '../mixins/composite';

class Panel extends M(Composite) {

  constructor(props) {
    super(props);
    this.setState(R.merge(this.state, { data: this.state.data || {} }));
  }

}

export default Panel;
