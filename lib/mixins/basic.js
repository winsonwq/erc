import Rx from 'rx';

export default c => class extends c {

  constructor(props) {
    super(props);
    this.state = {
      editable: !(props.editable === false),
      data: props.data || {},
      dataChange$: new Rx.Subject(),
      __editableComponent: true
    };
  }

  prop(name) {
    const { data, editable } = this.state;
    return { ref: name, data: data[name], editable };
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
