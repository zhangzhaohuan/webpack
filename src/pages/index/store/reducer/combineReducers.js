import { combineReducers } from 'redux';
import common from './common';

// 合并reducers
const reducers = combineReducers({
  ...common,
});
export default reducers;
