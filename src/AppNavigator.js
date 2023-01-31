import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Screens/Profile';
import WishList from './Screens/WishList';
import Cart from './Screens/Cart';
import Header from './commonFiles/Header';
import {useSelector} from 'react-redux';
import MyAddress from './Screens/MyAddress';
import {createStackNavigator} from '@react-navigation/stack';
import AddAddress from './Screens/AddAddress';
import Checkout from './Screens/Checkout';
import OrderStatus from './Screens/OrderStatus';
import MyOrders from './Screens/MyOrders';
import HomeClass from './Screens/HomeClass';
import ProductDetails, {
  ProductDetailsForAPI,
} from './commonFiles/ProductDetails';
import SearchFilter from './Screens/SearchFilter';
import CategoryList from './commonFiles/CategoryList';
import EditProfile from './Screens/EditProfile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AppNavigator = () => {
  const items = useSelector(state => state);
  // console.log(items);
  // console.log(items.Reducers.length);
  // console.log(items.Reducers2.length);
  return (
    <React.Fragment>
      <Header />
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            position: 'absolute',
            bottom: 15,
            left: 20,
            right: 20,
            backgroundColor: '#00FFFF',
            borderRadius: 15,
            height: 80,
          },
        }}>
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source={require('./images/home.png')}
                  style={{
                    width: 22,
                    height: 22,
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={
                    focused
                      ? {color: '#f4a', fontWeight: '800', fontSize: 20}
                      : {color: '#000'}
                  }>
                  Home
                </Text>
              </View>
            ),
          }}
          name="Home">
          {() => (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="HomeClass" component={HomeClass} />
              <Stack.Screen name="SearchFilter" component={SearchFilter} />
              <Stack.Screen name="CategoryList" component={CategoryList} />
              <Stack.Screen name="ProductDetails" component={ProductDetails} />
              <Stack.Screen
                name="ProductDetailsForAPI"
                component={ProductDetailsForAPI}
              />
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          options={{
            tabBarBadge: `${items.Reducers2.wishBasket.length}`,
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source={require('./images/wishlist.png')}
                  style={{
                    width: 22,
                    height: 22,
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={
                    focused
                      ? {color: '#f4a', fontWeight: '800', fontSize: 20}
                      : {color: '#000'}
                  }>
                  WishList
                </Text>
              </View>
            ),
          }}
          name="WishList"
          component={WishList}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source={require('./images/user.png')}
                  style={{
                    width: 22,
                    height: 22,
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={
                    focused
                      ? {color: '#f4a', fontWeight: '800', fontSize: 20}
                      : {color: '#000'}
                  }>
                  Profile
                </Text>
              </View>
            ),
          }}
          name="P">
          {() => (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="MyAddress" component={MyAddress} />
              <Stack.Screen name="AddAddress" component={AddAddress} />
              <Stack.Screen name="MyOrders" component={MyOrders} />
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          options={{
            tabBarBadge: `${items.Reducers.cartBasket.length}`,
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source={require('./images/cart.png')}
                  style={{
                    width: 22,
                    height: 22,
                    alignSelf: 'center',
                  }}
                />

                <Text
                  style={
                    focused
                      ? {color: '#f4a', fontWeight: '800', fontSize: 20}
                      : {color: '#000'}
                  }>
                  Cart
                </Text>
              </View>
            ),
          }}
          name="Cartlist">
          {() => (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Cart" component={Cart} />
              <Stack.Screen name="Checkout" component={Checkout} />
              <Stack.Screen name="OrderStatus" component={OrderStatus} />
            </Stack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </React.Fragment>
  );
};

export default AppNavigator;
