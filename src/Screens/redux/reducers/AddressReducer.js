import {ToastAndroid} from 'react-native';
import {ADD_ADDRESS, DELETE_ADDRESS} from '../ActionType';
const setToastMsg = msg => {
  ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
};
export const AddressReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ADDRESS:
      setToastMsg('Address Added');
      return [...state, action.payload];
    case DELETE_ADDRESS:
      const deletedArray = state.filter((item, index) => {
        return index !== action.payload;
      });
      setToastMsg('Address Removed');
      return deletedArray;

    default:
      return state;
  }
};
