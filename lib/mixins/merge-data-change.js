import R from 'ramda';

export default c => class extends c {

  componentDidMount() {

    super.componentDidMount();

    const { onChange } = this.props;
    const { dataChange$ } = this.state;

    const mergedDataChange$ = this.getMergedDataChange();

    mergedDataChange$
      .map(d => ({ data: d }))
      .do(onChange || R.T)
      .do(this.setState.bind(this))
      .subscribe(dataChange$.onNext.bind(dataChange$));
  }

};
