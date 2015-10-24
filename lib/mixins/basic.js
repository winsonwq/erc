import Rx from 'rx';

export default c => class extends c {

  constructor(props) {
    super(props);
    this.state = { dataChange$: new Rx.Subject(), __editableComponent: true };
  }

  getValue() {
    return { data: this.state.data };
  }

  render() { return null; }

};
