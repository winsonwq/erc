import Rx from 'rx';

export default c => class extends c {

  constructor(props) {
    super(props);
    this.state = { data: props.data || {}, dataChange$: new Rx.Subject(), __editableComponent: true };
  }

  prop(name) {
    return { ref: name, data: this.props.data[name] };
  }

  getValue() {
    return { data: this.state.data };
  }

  triggerChange() {
    setTimeout(function() {
      this.state.dataChange$.onNext(this.getValue());
    }.bind(this), 0);
  }

};
