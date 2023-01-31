import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  addItemToCart,
  addItemToWishlist,
  quantityChange,
} from '../Screens/redux/actions/Actions';
import {Modal} from 'react-native';

const CategoryItemCard = ({item, onAddToCart, onAddToWishlist}) => {
  return (
    <View
      style={{
        width: 188,
        height: 188,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5,
        marginBottom: 10,
        marginLeft: 5,
      }}>
      <Image
        source={item.image}
        style={{
          width: '100%',
          height: '50%',
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
          paddingLeft: 10,
          paddingRight: 5,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18, fontWeight: '800'}}>
          {'₹' + item.price}
        </Text>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            borderWidth: 1,
            paddingLeft: 5,
            paddingRight: 5,
            paddingBottom: 5,
            paddingTop: 5,
          }}
          onPress={() => {
            onAddToCart(item);
          }}>
          <Text>Add to Cart</Text>
        </TouchableOpacity>
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
          onAddToWishlist(item);
        }}>
        <Image
          source={require('../images/addwishlist.png')}
          style={{width: 24, height: 24}}
        />
      </TouchableOpacity>
    </View>
  );
};

const CategoryList = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const listRef = useRef();

  const [visible, setVisible] = useState(false);
  // var data = route.params.items.data;
  const [data, setData] = useState(route.params.items.data);

  return (
    <View style={{marginTop: 5}}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
          paddingLeft: 20,
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 24, fontWeight: '800'}}>
          {route.params.items.category}
        </Text>
        <TouchableOpacity
          style={{marginRight: 25}}
          onPress={() => {
            setVisible(true);
          }}>
          <Image
            source={require('../images/filter.png')}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        numColumns={2}
        ref={listRef}
        contentContainerStyle={{paddingBottom: 150}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProductDetails', {
                  items: item,
                });
              }}>
              <CategoryItemCard
                item={item}
                onAddToCart={x => {
                  dispatch(addItemToCart(item));
                  dispatch(quantityChange({...item, qty: 1}));
                }}
                onAddToWishlist={x => {
                  dispatch(addItemToWishlist(x));
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,.5)',
          }}>
          <View
            style={{
              width: '80%',
              height: 150,
              borderRadius: 10,
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
              }}
              onPress={() => {
                let temp = data.sort((a, b) => (a.name > b.name ? 1 : -1));
                setData(temp);
                listRef.current.scrollToIndex({animated: true, index: 0});
                setVisible(false);
              }}>
              <Text style={{fontSize: 18, color: '#000', alignSelf: 'center'}}>
                Sort By Name
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
              }}
              onPress={() => {
                let temp = data.sort((a, b) => a.price - b.price);
                setData(temp);
                listRef.current.scrollToIndex({animated: true, index: 0});
                setVisible(false);
              }}>
              <Text style={{fontSize: 18, color: '#000', alignSelf: 'center'}}>
                Price:- Low to High
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
              }}
              onPress={() => {
                let temp = data.sort((a, b) => (a.price > b.price ? -1 : 1));
                setData(temp);
                listRef.current.scrollToIndex({animated: true, index: 0});
                setVisible(false);
              }}>
              <Text style={{fontSize: 18, color: '#000', alignSelf: 'center'}}>
                Price:- High to Low
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CategoryList;
