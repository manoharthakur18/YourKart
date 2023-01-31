import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const ProductItemCard = ({
  item,
  onAddToCart,
  onRemoveItem,
  onAddToWishlist,
}) => {
  const [addedToWish, setAddedToWish] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: 200,
        height: 200,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5,
        marginBottom: 10,
        marginLeft: 15,
      }}>
      <Image
        source={item.image}
        style={{
          width: '100%',
          height: '50%',
          resizeMode: 'contain',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <Text
        style={{
          marginLeft: 10,
          marginTop: 10,
          fontSize: 18,
          fontWeight: '600',
        }}>
        {item.name}
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
        {addedToCart ? (
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
              navigation.navigate('Cartlist', {screen: 'Cart'});
            }}>
            <Text>Go to Cart</Text>
          </TouchableOpacity>
        ) : (
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
              onAddToCart(item);
              setAddedToCart(true);
            }}>
            <Text>Add to Cart</Text>
          </TouchableOpacity>
        )}
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
          addedToWish ? onRemoveItem() : onAddToWishlist(item);
          setAddedToWish(!addedToWish);
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

export default ProductItemCard;
