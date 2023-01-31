import {Alert, ToastAndroid} from 'react-native';
import {ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST} from '../ActionType';

export const initialState = {
  wishBasket: [],
};
const setToastMsg = msg => {
  ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
};
export const Reducers2 = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      if (
        !state.wishBasket.map(item => item.key).includes(action.payload.key)
      ) {
        setToastMsg('Item Added in Wishlist');
        return {...state, wishBasket: [...state.wishBasket, action.payload]};
      }
      Alert.alert('Wishlist', 'Already in wishlist');
      return state;
    case REMOVE_FROM_WISHLIST:
      const deletedArray2 = state.wishBasket.filter((item, index) => {
        return item.key !== action.payload;
      });
      setToastMsg('Item Removed from Wishlist');
      return {
        ...state,
        wishBasket: deletedArray2,
      };
    default:
      return state;
  }
};
