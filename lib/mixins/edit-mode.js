import assign from 'object-assign';
import R from 'ramda';

export default c => class extends c {

  constructor(props) {
    super(props);
    const { editable, editMode } = props;
    this.state = assign({}, this.state, { editable, editMode });
  }

  handleCancelEditMode() {
    this.setState({ editMode: false });
  }

  handleSwitchToEditMode() {
    this.setState({ editMode: true, willBeData: this.state.data });
  }

  handleConfirmEditMode() {
    const { data, willBeData, dataChange$ } = this.state;
    const { onChange } = this.props;

    this.setState({ data: willBeData, willBeData: null, editMode: false });

    if (!R.equals(data, willBeData)) {
      dataChange$.subscribe(onChange || R.T);
      dataChange$.onNext({ data: willBeData });
    }
  }

};
