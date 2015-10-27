import R from 'ramda';
import Rx from 'rx';

export default c => class extends c {

  constructor(props) {
    super(props);
    this.state = { data: props.data, dataChange$: new Rx.Subject(), __editableComponent: true };
  }

  prop(name) {
    return { ref: name, data: this.props.data[name] };
  }

  getValue() {
    return { data: this.state.data };
  }

  getFormattedComponents() {
    return R.toPairs(this.refs)
      .map(([name, compo]) => R.zipObj(['key', 'value'], [name, compo]))
      .filter(c => c.value.state.__editableComponent);
  }

  getAllChanges() {
    return this.getFormattedComponents()
      .map(function(compo) {
        return compo.value.state.dataChange$.map(d => R.zipObj([compo.key], [d.data]));
      });
  }

  getCurrData() {
    return this.getFormattedComponents()
      .map(function(compo) {
        return R.zipObj([compo.key], [compo.value.getValue().data]);
      })
      .reduce(R.merge, null);
  }

  getMergedDataChange() {
    return this.getAllChanges().reduce((sofar, curr) => sofar.merge(curr), new Rx.Subject()).scan(R.merge, this.getCurrData());
  }

  render() { return null; }

};
