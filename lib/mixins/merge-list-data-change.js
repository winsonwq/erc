import R from 'ramda';

export default c => class extends c {

  componentDidMount() {
    super.componentDidMount();
    this.subscribeChange();
  }

  subscribeChange() {
    const { onChange } = this.props;
    const { dataChange$ } = this.state;

    const mergedDataChange$ = this.getMergedDataChange();

    return mergedDataChange$
      .map(d => ({ data: R.values(d) }))
      .do(onChange || R.T)
      .do(this.setState.bind(this))
      .subscribe(dataChange$.onNext.bind(dataChange$));
  }

};
