import {Alert, ToastAndroid} from 'react-native';
import {ADD_TO_CART, QUANTITY_CHANGE, REMOVE_FROM_CART} from '../ActionType';

export const initialState = {
  cartBasket: [],
};
const setToastMsg = msg => {
  ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
};

export const Reducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (
        !state.cartBasket.map(item => item.key).includes(action.payload.key)
      ) {
        setToastMsg('Item Added in Cart');
        return {...state, cartBasket: [...state.cartBasket, action.payload]};
      }
      Alert.alert('Cartlist', 'Already in Cart');
      // return {...state, cartBasket: [...state.cartBasket, action.payload]};
      return state;
    case REMOVE_FROM_CART:
      const deletedArray = state.cartBasket.filter((item, index) => {
        return index !== action.payload;
      });
      setToastMsg('Item Removed from Cart');
      return {...state, cartBasket: deletedArray};
    case QUANTITY_CHANGE:
      let updatedArray = state.cartBasket.map(item => {
        if (item.key == action.payload.key) {
          return action.payload;
        }
        return item;
      });
      // console.log(key);
      return {...state, cartBasket: updatedArray};
    // setToastMsg('QUANTITY ADDED');
    // return {
    //   ...state,
    //   cartBasket: [...state.cartBasket],
    // };
    // }

    default:
      return state;
  }
};
