import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {AirbnbRating} from '@rneui/themed';
import {ScrollView} from 'react-native';
import {
  addItemToCart,
  addItemToWishlist,
  quantityChange,
} from '../Screens/redux/actions/Actions';
import {useDispatch} from 'react-redux';

const ProductDetails = () => {
  const route = useRoute();
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View
        style={{
          width: '94%',
          borderRadius: 10,
          backgroundColor: '#fff',
          elevation: 5,
          margin: 15,
          padding: 10,
        }}>
        <Image
          source={route.params.items.image}
          style={{
            width: '100%',
            height: 300,
            resizeMode: 'contain',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
        <Text
          style={{
            marginLeft: 10,
            marginTop: 10,
            fontSize: 27,
            fontWeight: '800',
          }}>
          {route.params.items.name}
        </Text>
        <Text
          style={{
            marginLeft: 10,
            marginTop: 10,
            fontSize: 24,
            fontWeight: '500',
          }}>
          {route.params.items.description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 7,
            marginLeft: 10,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 30, fontWeight: '800'}}>
            {'₹' + route.params.items.price}
          </Text>
          <Text
            style={{
              fontSize: 30,
              // padding: 5,
            }}>
            {route.params.items.gender}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
            alignItems: 'center',
            margin: 10,
          }}>
          <AirbnbRating
            isDisabled={true}
            defaultRating={route.params.items.rating}
            size={30}
            showRating={false}
          />
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
              dispatch(addItemToCart(route.params.items));
              dispatch(quantityChange({...route.params.items, qty: 1}));
            }}>
            <Text style={{fontSize: 20}}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            backgroundColor: '#fff',
            borderRadius: 30,
            elevation: 5,
            position: 'absolute',
            top: 10,
            right: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            dispatch(addItemToWishlist(route.params.items));
          }}>
          <Image
            source={require('../images/addwishlist.png')}
            style={{width: 35, height: 35}}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export const ProductDetailsForAPI = () => {
  const route = useRoute();
  // console.log(route);
  return (
    <ScrollView>
      <View
        style={{
          width: '94%',
          borderRadius: 10,
          backgroundColor: '#fff',
          elevation: 5,
          marginBottom: 110,
          margin: 15,
          padding: 10,
        }}>
        <Image
          source={{uri: route.params.items.image}}
          style={{
            width: '100%',
            height: 300,
            resizeMode: 'contain',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
        <Text
          style={{
            marginLeft: 10,
            marginTop: 10,
            fontSize: 20,
            fontWeight: '600',
          }}>
          {route.params.items.category}
        </Text>
        <Text
          style={{
            marginLeft: 10,
            marginTop: 10,
            fontSize: 27,
            fontWeight: '800',
          }}>
          {route.params.items.title}
        </Text>
        <Text
          style={{
            marginLeft: 10,
            marginTop: 10,
            fontSize: 20,
          }}>
          {route.params.items.description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 7,
            marginLeft: 10,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 30, fontWeight: '800'}}>
            {'₹' + route.params.items.price}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 30,
                color: '#FF9529',
                fontWeight: '900',
              }}>
              {route.params.items.rating.rate}
            </Text>
            <Image
              source={require('../images/star.png')}
              style={{width: 30, height: 30, alignSelf: 'center'}}
            />
          </View>
        </View>

        {/* <TouchableOpacity
            style={{
              borderRadius: 10,
              borderWidth: 1,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 5,
              paddingTop: 5,
            }}
            onPress={() => {
              dispatch(addItemToCart(route.params.items));
              dispatch(quantityChange({...route.params.items, qty: 1}));
            }}>
            <Text style={{fontSize: 20}}>Add to Cart</Text>
          </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            backgroundColor: '#fff',
            borderRadius: 30,
            elevation: 5,
            position: 'absolute',
            top: 10,
            right: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            dispatch(addItemToWishlist(route.params.items));
          }}>
          <Image
            source={require('../images/addwishlist.png')}
            style={{width: 35, height: 35}}
          />
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

export default ProductDetails;
