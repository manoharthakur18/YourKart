import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const WishlistItem = ({item, onRemoveItem, onAddToCart}) => {
  return (
    <View
      style={{
        width: '95%',
        height: 150,
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
            // width: '65%',
            // marginTop: 10,
            fontSize: 18,
            // fontWeight: '600',
          }}>
          {item.description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            // width: '50%',
            margin: 10,
            justifyContent: 'space-between',
            // paddingLeft: 15,
            // paddingRight: 10,
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
              onAddToCart(item);
            }}>
            <Text>Add to Cart</Text>
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
          onRemoveItem();
        }}>
        <Image
          source={require('../images/like.png')}
          style={{width: 24, height: 24, tintColor: 'red'}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default WishlistItem;
