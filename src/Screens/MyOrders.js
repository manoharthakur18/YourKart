import {View, Text, FlatList, Image} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const MyOrders = () => {
  const orders = useSelector(state => state.OrderReducer);
  return (
    <View>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 30,
          padding: 7,
          fontWeight: '900',
        }}>
        My Orders
      </Text>
      {orders.length ? (
        <FlatList
          data={orders}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: '100%',
                  borderWidth: 0.5,
                  justifyContent: 'center',
                }}>
                {item.items.map(item1 => {
                  return (
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={item1.image}
                        style={{
                          width: 50,
                          height: 50,
                          marginTop: 10,
                          marginLeft: 20,
                          marginBottom: 10,
                        }}
                      />
                      <Text style={{fontSize: 18, marginLeft: 20}}>
                        {item1.name}
                      </Text>
                    </View>
                  );
                })}
              </View>
            );
          }}
        />
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../images/no-order.png')}
            style={{
              width: 300,
              height: 300,
            }}
          />
          <Text style={{fontSize: 24, fontWeight: '300'}}>
            You don't have any order yet
          </Text>
          <Text style={{fontSize: 28, fontWeight: '500'}}>
            Please Order now!!!
          </Text>
        </View>
      )}
    </View>
  );
};

export default MyOrders;
