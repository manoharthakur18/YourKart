import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Slider from './Slider';
import {products} from '../data/Products';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import ProductItemCard from '../commonFiles/ProductItemCard';
import {useDispatch} from 'react-redux';
import {addItemToCart, addItemToWishlist} from './redux/actions/Actions';

const Home = () => {
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);
  const [shoeList, setShoeList] = useState([]);
  const [tshirtList, setTshirtList] = useState([]);
  const [jeansList, setJeansList] = useState([]);
  const [jacketList, setJacketList] = useState([]);
  const [laptopList, setLaptopList] = useState([]);

  useEffect(() => {
    let tempCategory = [];
    products.category.map(item => {
      tempCategory.push(item);
    });
    setCategoryList(tempCategory);
    setTshirtList(products.category[0].data);
    setShoeList(products.category[1].data);
    setJeansList(products.category[2].data);
    setJacketList(products.category[3].data);
    setLaptopList(products.category[4].data);
  }, []);

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View style={{flex: 1, marginBottom: 110}}>
        <Slider />
        <View style={{marginTop: 10}}>
          <FlatList
            data={categoryList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    marginLeft: 20,
                    borderRadius: 20,
                  }}>
                  <Text style={{color: '#000', fontWeight: '500'}}>
                    {item.category}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <Text
          style={{
            marginTop: 20,
            marginLeft: 20,
            fontWeight: '800',
            fontSize: 18,
          }}>
          New Tshirt
        </Text>
        <View style={{marginTop: 10}}>
          <FlatList
            data={tshirtList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <ProductItemCard
                  item={item}
                  onAddToCart={x => {
                    dispatch(addItemToCart(x));
                  }}
                  onAddToWishlist={x => {
                    dispatch(addItemToWishlist(x));
                  }}
                />
              );
            }}
          />
        </View>
        <Text
          style={{
            marginTop: 20,
            marginLeft: 20,
            fontWeight: '800',
            fontSize: 18,
          }}>
          New Shoes
        </Text>
        <View style={{marginTop: 10}}>
          <FlatList
            data={shoeList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <ProductItemCard
                  item={item}
                  onAddToCart={x => {
                    dispatch(addItemToCart(item));
                  }}
                  onAddToWishlist={x => {
                    dispatch(addItemToWishlist(x));
                  }}
                />
              );
            }}
          />
        </View>
        <Text
          style={{
            marginTop: 20,
            marginLeft: 20,
            fontWeight: '800',
            fontSize: 18,
          }}>
          New Jeans
        </Text>
        <View style={{marginTop: 10}}>
          <FlatList
            data={jeansList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <ProductItemCard
                  item={item}
                  onAddToCart={x => {
                    dispatch(addItemToCart(item));
                  }}
                  onAddToWishlist={x => {
                    dispatch(addItemToWishlist(x));
                  }}
                />
              );
            }}
          />
        </View>
        <Text
          style={{
            marginTop: 20,
            marginLeft: 20,
            fontWeight: '800',
            fontSize: 18,
          }}>
          New Jacket
        </Text>
        <View style={{marginTop: 10}}>
          <FlatList
            data={jacketList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <ProductItemCard
                  item={item}
                  onAddToCart={x => {
                    dispatch(addItemToCart(item));
                  }}
                  onAddToWishlist={x => {
                    dispatch(addItemToWishlist(x));
                  }}
                />
              );
            }}
          />
        </View>
        <Text
          style={{
            marginTop: 20,
            marginLeft: 20,
            fontWeight: '800',
            fontSize: 18,
          }}>
          New Laptop
        </Text>
        <View style={{marginTop: 10, width: '100%'}}>
          <FlatList
            data={laptopList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <ProductItemCard
                  item={item}
                  onAddToCart={x => {
                    dispatch(addItemToCart(item));
                  }}
                  onAddToWishlist={x => {
                    dispatch(addItemToWishlist(x));
                  }}
                />
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
