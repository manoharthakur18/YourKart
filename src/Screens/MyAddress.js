import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAddress} from './redux/actions/Actions';

const MyAddress = () => {
  const navigation = useNavigation();
  const addressList = useSelector(state => state.AddressReducer);
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: 70,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontWeight: '600', fontSize: 18, marginLeft: 15}}>
          My Address
        </Text>
        <TouchableOpacity
          style={{
            marginRight: 15,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.2,
            padding: 7,
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('AddAddress');
          }}>
          <Text>Add Address</Text>
        </TouchableOpacity>
      </View>
      {addressList.length ? (
        <FlatList
          data={addressList}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: '100%',
                  marginTop: 20,
                  borderBottomColor: 'red',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={{marginLeft: 20, fontSize: 17}}>
                    {'Name: ' + item.name}
                  </Text>
                  <Text style={{marginLeft: 20, fontSize: 17}}>
                    {'House Name: ' + item.houseName}
                  </Text>
                  <Text style={{marginLeft: 20, fontSize: 17}}>
                    {'City: ' + item.city}
                  </Text>
                  <Text style={{marginLeft: 20, fontSize: 17}}>
                    {'Pin code: ' + item.pinCode}
                  </Text>
                  <Text style={{marginLeft: 20, fontSize: 17}}>
                    {'Contact: ' + item.contactNumber}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    marginRight: 20,
                    padding: 7,
                  }}
                  onPress={() => {
                    dispatch(deleteAddress(index));
                  }}>
                  <Image
                    source={require('../images/delete.png')}
                    style={{width: 24, height: 24}}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      ) : (
        <View style={{alignItems: 'center', marginTop: 90}}>
          <Image
            source={require('../images/address.png')}
            style={{
              width: 300,
              height: 300,
            }}
          />
          <Text style={{fontSize: 24, marginTop: 10, fontWeight: '500'}}>
            No address found
          </Text>
        </View>
      )}
    </View>
  );
};

export default MyAddress;
