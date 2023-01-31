import {View, FlatList} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import WishlistItem from '../commonFiles/WishlistItem';
import {
  addItemToCart,
  quantityChange,
  removeFromWishlist,
} from './redux/actions/Actions';
import CommonButton from '../commonFiles/CommonButton';
import {Image} from 'react-native';

class WishList extends Component {
  render() {
    return this.props.wishlistData.length ? (
      <View style={{flex: 1}}>
        <FlatList
          data={this.props.wishlistData}
          contentContainerStyle={{paddingBottom: 110}}
          renderItem={({item, index}) => {
            return (
              <WishlistItem
                item={item}
                onRemoveItem={() => {
                  this.props.removeFromWishlist(item.key);
                }}
                onAddToCart={x => {
                  this.props.addItemToCart(x);
                  this.props.quantityChange({...item, qty: 1});
                }}
              />
            );
          }}
        />
      </View>
    ) : (
      <View style={{flex: 1, alignItems: 'center', marginTop: 50}}>
        <Image
          source={require('../images/empty-wishlist.png')}
          style={{width: 300, height: 300}}
        />
        <CommonButton
          title={'Click to add items in Wishlist'}
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
  return {wishlistData: state.Reducers2.wishBasket};
}
export default connect(mapStateToProps, {
  removeFromWishlist,
  addItemToCart,
  quantityChange,
})(WishList);

// const Wishlist = () => {
//   const navigation = useNavigation();
//   const wishlistData = useSelector(state => state.Reducers2.wishBasket);
//   const dispatch = useDispatch();
//   return wishlistData.length ? (
//     <View style={{flex: 1, marginBottom: 110}}>
//       <FlatList
//         data={wishlistData}
//         renderItem={({item, index}) => {
//           return (
//             <WishlistItem
//               item={item}
//               onRemoveItem={() => {
//                 dispatch(removeFromWishlist(index));
//               }}
//               onAddToCart={x => {
//                 dispatch(addItemToCart(x));
//                 dispatch(quantityChange({...item, qty: 1}));
//               }}
//             />
//           );
//         }}
//       />
//     </View>
//   ) : (
//     <View style={{flex: 1, alignItems: 'center', marginTop: 50}}>
//       <Image
//         source={require('../images/empty-wishlist.png')}
//         style={{width: 300, height: 300}}
//       />
//       <CommonButton
//         title={'Click to add items in Wishlist'}
//         bgColor={'#0000FF'}
//         textColor={'#fff'}
//         onPress={() => {
//           navigation.navigate('Home');
//         }}
//       />
//     </View>
//   );
// };
