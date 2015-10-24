import R from 'ramda';

export default c => class extends c {

  componentDidMount() {

    super.componentDidMount();

    const { onChange } = this.props;
    const { dataChange$ } = this.state;

    const formattedComponents = R.toPairs(this.refs)
      .map(([name, compo]) => R.zipObj(['key', 'value'], [name, compo]))
      .filter(c => c.value.state.__editableComponent);

    const allChanges = formattedComponents.map(function(compo) {
      return compo.value.state.dataChange$.map(d => R.zipObj([compo.key], [d.data]));
    });

    const mergedDataChange$ = allChanges.reduce((sofar, curr) => sofar.merge(curr)).scan(R.merge, {});

    mergedDataChange$
      .map(d => ({ data: d }))
      .do(onChange || R.T)
      .subscribe(dataChange$.onNext.bind(dataChange$));

  }

};
