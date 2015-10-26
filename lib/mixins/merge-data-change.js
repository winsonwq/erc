import R from 'ramda';

export default c => class extends c {

  componentDidMount() {

    super.componentDidMount();

    const { onChange } = this.props;
    const { dataChange$ } = this.state;

    const formattedComponents = R.toPairs(this.refs)
      .map(([name, compo]) => R.zipObj(['key', 'value'], [name, compo]))
      .filter(c => c.value.state.__editableComponent);

    const currData = formattedComponents
      .map(function(compo) {
        return R.zipObj([compo.key], [compo.value.getValue().data]);
      })
      .reduce(R.merge);

    const allChanges = formattedComponents.map(function(compo) {
      return compo.value.state.dataChange$.map(d => R.zipObj([compo.key], [d.data]));
    });

    const mergedDataChange$ = allChanges.reduce((sofar, curr) => sofar.merge(curr)).scan(R.merge, currData);

    mergedDataChange$
      // TODO: fix first value data
      // .startWith(currData)
      .map(d => ({ data: d }))
      .do(onChange || R.T)
      .do(this.setState.bind(this))
      .subscribe(dataChange$.onNext.bind(dataChange$));
  }

};
