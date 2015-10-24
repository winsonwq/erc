
import R from 'ramda';

import Basic from './basic';
import MergedDataChange from './merge-data-change';

export default R.compose(Basic, MergedDataChange);
