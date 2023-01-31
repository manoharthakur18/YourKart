import {View, FlatList, Image} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import CartItem from '../commonFiles/CartItem';
import {
  removeFromCart,
  addItemToWishlist,
  quantityChange,
  removeFromWishlist,
} from './redux/actions/Actions';
import CommonButton from '../commonFiles/CommonButton';

class Cart extends Component {
  render() {
    return this.props.cartData.length ? (
      <View style={{flex: 1}}>
        <FlatList
          data={this.props.cartData}
          ListFooterComponent={
            <CommonButton
              title={'Checkout'}
              bgColor={'#0000FF'}
              textColor={'#fff'}
              onPress={() => {
                this.props.navigation.navigate('Checkout');
              }}
            />
          }
          contentContainerStyle={{paddingBottom: 110}}
          renderItem={({item, index}) => {
            return (
              <CartItem
                item={item}
                onRemoveItem={() => {
                  this.props.removeFromCart(index);
                }}
                onAddToWishlist={x => {
                  this.props.addItemToWishlist(x);
                }}
                onQuantityChange={count => {
                  this.props.quantityChange({...item, qty: count});
                }}
                onRemoveItemFromWish={x => {
                  this.props.removeFromWishlist(item.key);
                }}
              />
            );
          }}
        />
      </View>
    ) : (
      <View style={{flex: 1, alignItems: 'center', marginTop: 50}}>
        <Image
          source={require('../images/empty-cart.webp')}
          style={{width: 300, height: 300}}
        />
        <CommonButton
          title={'Click to add items in cart'}
          bgColor={'#0000FF'}
          textColor={'#fff'}
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {cartData: state.Reducers.cartBasket};
}

export default connect(mapStateToProps, {
  removeFromCart,
  addItemToWishlist,
  quantityChange,
  removeFromWishlist,
})(Cart);
// const Cart = () => {
//   const navigation = useNavigation();
//   const cartData = useSelector(state => state.Reducers.cartBasket);
//   const dispatch = useDispatch();
//   return cartData.length ? (
//     <View style={{flex: 1}}>
//       <FlatList
//         data={cartData}
//         ListFooterComponent={
//           <CommonButton
//             title={'Checkout'}
//             bgColor={'#0000FF'}
//             textColor={'#fff'}
//             onPress={() => {
//               navigation.navigate('Checkout');
//             }}
//           />
//         }
//         contentContainerStyle={{paddingBottom: 110}}
//         renderItem={({item, index}) => {
//           return (
//             <CartItem
//               item={item}
//               onRemoveItem={() => {
//                 dispatch(removeFromCart(index));
//               }}
//               onAddToWishlist={x => {
//                 dispatch(addItemToWishlist(x));
//               }}
//               onQuantityChange={count => {
//                 dispatch(quantityChange({...item, qty: count}));
//               }}
//             />
//           );
//         }}
//       />
//     </View>
//   ) : (
//     <View style={{flex: 1, alignItems: 'center', marginTop: 50}}>
//       <Image
//         source={require('../images/empty-cart.webp')}
//         style={{width: 300, height: 300}}
//       />
//       <CommonButton
//         title={'Click to add items in cart'}
//         bgColor={'#0000FF'}
//         textColor={'#fff'}
//         onPress={() => {
//           navigation.navigate('Home');
//         }}
//       />
//     </View>
//   );
// };

// export default Cart;
