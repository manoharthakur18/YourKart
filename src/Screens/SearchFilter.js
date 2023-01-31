import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SearchFilter = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [oldData, setOldData] = useState([]);
  const searchRef = useRef();
  const listRef = useRef();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(response => {
        // console.log(response);
        setData(response);
        setOldData(response);
      });
  }, []);
  const onSearch = text => {
    if (text == '') {
      setData(oldData);
    } else {
      let tempData = oldData.filter(item => {
        return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(tempData);
    }
  };
  return (
    <View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          height: 70,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: '80%',
            height: 50,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
          }}>
          <Image
            source={require('../images/search.png')}
            style={{width: 24, height: 24, marginLeft: 15, opacity: 0.5}}
          />
          <TextInput
            ref={searchRef}
            placeholder="search item here..."
            style={{width: '76%', height: 50}}
            value={search}
            onChangeText={txt => {
              onSearch(txt);
              setSearch(txt);
            }}
          />
          {search == '' ? null : (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => {
                searchRef.current.clear();
                onSearch('');
                setSearch('');
              }}>
              <Image
                source={require('../images/close.png')}
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
          )}
        </View>
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
      {data.length > 0 ? (
        <FlatList
          data={data}
          ref={listRef}
          contentContainerStyle={{paddingBottom: 160}}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductDetailsForAPI', {
                    items: item,
                  });
                }}>
                <SearchFilterItemCard
                  item={item}
                  //   onAddToCart={x => {
                  //     dispatch(addItemToCart(x));
                  //   }}
                  //   onAddToWishlist={x => {
                  //     dispatch(addItemToWishlist(x));
                  //   }}
                />
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <ActivityIndicator size={'large'} />
      )}
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
              height: 200,
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
                let temp = data.sort((a, b) => (a.title > b.title ? 1 : -1));
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
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                // borderBottomWidth: 0.5,
                justifyContent: 'center',
              }}
              onPress={() => {
                let temp = data.sort((a, b) => b.rating.rate - a.rating.rate);
                setData(temp);
                listRef.current.scrollToIndex({animated: true, index: 0});
                setVisible(false);
              }}>
              <Text style={{fontSize: 18, color: '#000', alignSelf: 'center'}}>
                Sort By Ratings
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export const SearchFilterItemCard = ({item, onRemoveItem, onAddToWishlist}) => {
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
        source={{uri: item.image}}
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
            fontSize: 16,
            fontWeight: '600',
          }}>
          {item.title}
        </Text>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 15,
            paddingRight: 10,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, fontWeight: '800'}}>
            {'₹' + item.price}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
                color: '#FF9529',
              }}>
              {item.rating.rate}
            </Text>
            <Image
              source={require('../images/star.png')}
              style={{width: 24, height: 24}}
            />
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
              onRemoveItem();
            }}>
            <Text>Remove Item</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}
    </View>
  );
};

export default SearchFilter;
