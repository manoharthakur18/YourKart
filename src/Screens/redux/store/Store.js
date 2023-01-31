import {combineReducers, createStore} from 'redux';
import {AddressReducer} from '../reducers/AddressReducer';
import {OrderReducer} from '../reducers/OrderReducer';
import {Reducers} from '../reducers/Reducers';
import {Reducers2} from '../reducers/Reducers2';

const routeReducer = combineReducers({
  Reducers,
  Reducers2,
  AddressReducer,
  OrderReducer,
});

const Store = createStore(routeReducer);

export default Store;
