import M from './mixin';

import Basic from './mixins/basic';
import MergedDataChange from './mixins/merge-data-change';

class Panel extends M(Basic, MergedDataChange) {}

export default Panel;
