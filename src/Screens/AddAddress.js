import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import CustomTextInput from '../commonFiles/CustomTextInput';
import CommonButton from '../commonFiles/CommonButton';
import {useDispatch} from 'react-redux';
import {addAddress} from './redux/actions/Actions';

const AddAddress = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [houseName, setHouseName] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [contactNumber, setContactNumber] = useState('');
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
        <TouchableOpacity
          style={{
            marginLeft: 15,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.2,
            padding: 7,
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../images/back.png')}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
      </View>
      <CustomTextInput
        placeholder={'Name'}
        value={name}
        onChangeText={txt => {
          setName(txt);
        }}
        icon={require('../images/user.png')}
      />
      <CustomTextInput
        placeholder={'House Name'}
        value={houseName}
        onChangeText={txt => {
          setHouseName(txt);
        }}
        icon={require('../images/house.png')}
      />
      <CustomTextInput
        placeholder={'City Name'}
        value={city}
        onChangeText={txt => {
          setCity(txt);
        }}
        icon={require('../images/city.png')}
      />
      <CustomTextInput
        placeholder={'Pin Code'}
        value={pinCode}
        onChangeText={txt => {
          setPinCode(txt);
        }}
        icon={require('../images/pin.png')}
      />
      <CustomTextInput
        placeholder={'Contact number'}
        value={contactNumber}
        onChangeText={txt => {
          setContactNumber(txt);
        }}
        icon={require('../images/contact.png')}
      />
      <CommonButton
        title={'Save Address'}
        bgColor={'#000'}
        textColor={'#fff'}
        onPress={() => {
          if (city !== '' && houseName !== '' && pinCode !== '') {
            dispatch(
              addAddress({
                name: name,
                city: city,
                houseName: houseName,
                pinCode: pinCode,
                contactNumber: contactNumber,
              }),
            );
            navigation.goBack();
          }
        }}
      />
    </View>
  );
};

export default AddAddress;
