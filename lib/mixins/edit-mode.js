import assign from 'object-assign';
import R from 'ramda';
import cx from 'classnames';

import EditableWrapper from '../editable-wrapper.react';

export default c => class extends c {

  constructor(props) {
    super(props);
    const { editable, editMode } = props;
    this.state = assign({}, this.state, { editable, editMode });
  }

  handlePropChange(propName) {
    return function(value) {
      const data = R.merge(this.state.willBeData, R.zipObj([propName], [value]));
      this.setState({ willBeData: data });
    };
  }

  handlePropChangeFromTargetValue(propName) {
    return this.handlePropChangeFromTarget(propName, 'target.value');
  }

  handlePropChangeFromTarget(propName, path) {
    return R.compose(this.handlePropChange(propName), R.path(path.split('.')));
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

  renderContent() {
    return null;
  }

  // TODO: should it be same for img link and paragraph
  renderWith(defaultTagName, defaultClassName) {

    const { editable, className, tagName } = this.props;
    const { editMode } = this.state;

    return (
      <EditableWrapper { ...{ tagName: defaultTagName || tagName, className: cx(className, defaultClassName), editable, editMode } }

        onSwitchToEditMode={ this.handleSwitchToEditMode.bind(this) }
        onCancelEditMode={ this.handleCancelEditMode.bind(this) }
        onConfirmEditMode={ this.handleConfirmEditMode.bind(this) }>

        { this.renderContent() }
      </EditableWrapper>
    );

  }

};
