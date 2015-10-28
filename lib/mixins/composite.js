
import R from 'ramda';
import Rx from 'rx';

import Basic from './basic';

export default R.compose(Basic, c => class extends c {

  componentDidMount() {
    super.componentDidMount();
    this.subscribeChange();
  }

  subscribeChange() {
    const { onChange } = this.props;
    const { dataChange$ } = this.state;

    const mergedDataChange$ = this.getMergedDataChange();

    return mergedDataChange$
      .map(d => ({ data: d }))
      .do(onChange || R.T)
      .do(this.setState.bind(this))
      .subscribe(dataChange$.onNext.bind(dataChange$));
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

  getCompositeData() {
    return this.getFormattedComponents()
      .map(function(compo) {
        return R.zipObj([compo.key], [compo.value.getValue().data]);
      })
      .reduce(R.merge, null);
  }

  getMergedDataChange() {
    return this.getAllChanges().reduce((sofar, curr) => sofar.merge(curr), new Rx.Subject()).scan(R.merge, this.getCompositeData());
  }

  render() { return null; }

});
