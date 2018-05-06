import { combineReducers } from 'redux';
import createFormReducer from 'common/components-containers/Form/redux/reducer';

const reducer = combineReducers({
  land: createFormReducer('47-03-01'),
});

export default reducer;
