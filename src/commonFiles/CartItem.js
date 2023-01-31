import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

const CartItem = ({
  item,
  onRemoveItem,
  onRemoveItemFromWish,
  onAddToWishlist,
  onQuantityChange,
}) => {
  const [count, setCount] = useState(1);
  const wishlist = useSelector(state => state.Reducers2.wishBasket);

  let addedToWish = false;
  wishlist.forEach(ele => {
    if (item.key == ele.key) {
      addedToWish = true;
    }
  });

  return (
    <View
      style={{
        width: '95%',
        height: 170,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5,
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 10,
      }}>
      <Image
        source={item.image}
        style={{
          width: '40%',
          height: '100%',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      />
      <View style={{width: '60%'}}>
        <Text
          style={{
            marginLeft: 10,
            marginTop: 10,
            fontSize: 24,
            fontWeight: '600',
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 18,
          }}>
          {item.description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 15,
            paddingRight: 10,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, fontWeight: '800'}}>
            {'₹' + item.price}
          </Text>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              borderWidth: 1,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 5,
              paddingTop: 5,
            }}
            onPress={() => {
              onRemoveItem();
            }}>
            <Text>Remove Item</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 10,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setCount(count + 1);
              onQuantityChange(count + 1);
            }}>
            <Image
              source={require('../images/more.png')}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 24, fontWeight: '800'}}>{count}</Text>
          <TouchableOpacity
            onPress={() => {
              if (count > 1) {
                setCount(count - 1);
                onQuantityChange(count - 1);
              }
            }}>
            <Image
              source={require('../images/minus.png')}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          backgroundColor: '#fff',
          borderRadius: 20,
          elevation: 5,
          position: 'absolute',
          top: 5,
          right: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          addedToWish ? onRemoveItemFromWish() : onAddToWishlist(item);
        }}>
        {addedToWish ? (
          <Image
            source={require('../images/like.png')}
            style={{width: 24, height: 24, tintColor: 'red'}}
          />
        ) : (
          <Image
            source={require('../images/addwishlist.png')}
            style={{width: 24, height: 24}}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
