import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import {products} from '../data/Products';
import Slider from './Slider';
import ProductItemCard from '../commonFiles/ProductItemCard';
import {
  addItemToCart,
  addItemToWishlist,
  quantityChange,
  removeFromWishlist,
} from './redux/actions/Actions';
import {connect} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import {
  notificationListner,
  requestUserPermission,
} from '../commonFiles/NotificationService';
import PopUp from './PopUp';
import {ActivityIndicator} from 'react-native-paper';
import {SearchFilterItemCard} from './SearchFilter';

class HomeClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      shoeList: [],
      tshirtList: [],
      jeansList: [],
      jacketList: [],
      laptopList: [],
      data: [],
    };
  }

  componentDidMount() {
    requestUserPermission();
    notificationListner();
    this.createChannel();
    let tempCategory = [];
    products.category.map(item => {
      tempCategory.push(item);
    });
    this.setState({categoryList: tempCategory});
    this.setState({tshirtList: products.category[0].data});
    this.setState({shoeList: products.category[1].data});
    this.setState({jeansList: products.category[2].data});
    this.setState({jacketList: products.category[3].data});
    this.setState({laptopList: products.category[4].data});
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(response => {
        // console.log(response);
        this.setState({data: response});
      });
  }
  onSendNotification = () => {
    PushNotification.localNotification({
      channelId: 'your-kart', // (required)
      title: 'category section!!',
      message: 'Dear Customer \nYou are in category section', // (required)
    });
  };

  createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'your-kart', // (required)
        channelName: 'Your Kart', // (required)
        // channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        // playSound: false, // (optional) default: true
        // soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        // importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        // vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      // (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };
  render() {
    return (
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <PopUp />
        <View style={{flex: 1, marginBottom: 110}}>
          <Slider />
          <View style={{marginTop: 10}}>
            <FlatList
              data={this.state.categoryList}
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
                    }}
                    onPress={() => {
                      this.onSendNotification();
                      this.props.navigation.navigate('CategoryList', {
                        items: item,
                      });
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
              data={this.state.tshirtList}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('ProductDetails', {
                        items: item,
                      });
                    }}>
                    <ProductItemCard
                      item={item}
                      onAddToCart={x => {
                        this.props.addItemToCart(item);
                        this.props.quantityChange({...item, qty: 1});
                      }}
                      onAddToWishlist={x => {
                        this.props.addItemToWishlist(x);
                      }}
                      onRemoveItem={x => {
                        this.props.removeFromWishlist(item.key);
                      }}
                    />
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
            New Shoes
          </Text>
          <View style={{marginTop: 10}}>
            <FlatList
              data={this.state.shoeList}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('ProductDetails', {
                        items: item,
                      });
                    }}>
                    <ProductItemCard
                      item={item}
                      onAddToCart={x => {
                        this.props.addItemToCart(item);
                        this.props.quantityChange({...item, qty: 1});
                      }}
                      onAddToWishlist={x => {
                        this.props.addItemToWishlist(x);
                      }}
                      onRemoveItem={x => {
                        this.props.removeFromWishlist(item.key);
                      }}
                    />
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
            New Jeans
          </Text>
          <View style={{marginTop: 10}}>
            <FlatList
              data={this.state.jeansList}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('ProductDetails', {
                        items: item,
                      });
                    }}>
                    <ProductItemCard
                      item={item}
                      onAddToCart={x => {
                        this.props.addItemToCart(item);
                        this.props.quantityChange({...item, qty: 1});
                      }}
                      onAddToWishlist={x => {
                        this.props.addItemToWishlist(x);
                      }}
                      onRemoveItem={x => {
                        this.props.removeFromWishlist(item.key);
                      }}
                    />
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
            New Jacket
          </Text>
          <View style={{marginTop: 10}}>
            <FlatList
              data={this.state.jacketList}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('ProductDetails', {
                        items: item,
                      });
                    }}>
                    <ProductItemCard
                      item={item}
                      onAddToCart={x => {
                        this.props.addItemToCart(item);
                        this.props.quantityChange({...item, qty: 1});
                      }}
                      onAddToWishlist={x => {
                        this.props.addItemToWishlist(x);
                      }}
                      onRemoveItem={x => {
                        this.props.removeFromWishlist(item.key);
                      }}
                    />
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
            New Laptop
          </Text>
          <View style={{marginTop: 10, width: '100%'}}>
            <FlatList
              data={this.state.laptopList}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('ProductDetails', {
                        items: item,
                      });
                    }}>
                    <ProductItemCard
                      item={item}
                      onAddToCart={x => {
                        this.props.addItemToCart(item);
                        this.props.quantityChange({...item, qty: 1});
                      }}
                      onAddToWishlist={x => {
                        this.props.addItemToWishlist(x);
                      }}
                      onRemoveItem={x => {
                        this.props.removeFromWishlist(item.key);
                      }}
                    />
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
            API Data
          </Text>
          <View style={{marginTop: 10}}>
            {/* <FlatList
              data={this.state.data}
              // contentContainerStyle={{paddingBottom: 160}}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <SearchFilterItemCard
                    item={item}
                    //   onAddToCart={x => {
                    //     dispatch(addItemToCart(x));
                    //   }}
                    //   onAddToWishlist={x => {
                    //     dispatch(addItemToWishlist(x));
                    //   }}
                  />
                );
              }}
            /> */}

            {this.state.data.length > 0 ? (
              this.state.data.map((item, id) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('ProductDetailsForAPI', {
                      items: item,
                    });
                  }}
                  key={id}>
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
              ))
            ) : (
              <ActivityIndicator size={'small'} />
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}
// function mapStateToProps(state) {
//   return {wishlist: state.wishBasket};
// }

export default connect(null, {
  addItemToCart,
  addItemToWishlist,
  removeFromWishlist,
  quantityChange,
})(HomeClass);
