import {View, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomTextInput from '../commonFiles/CustomTextInput';
import CommonButton from '../commonFiles/CommonButton';
import {AuthContext} from '../authentication/AuthProvider';
import Loader from '../commonFiles/Loader';

const EditProfile = () => {
  const routes = useRoute();
  const [name, setName] = useState(routes.params.name);
  const [email, setEmail] = useState(routes.params.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const {update, changePassword, changeEmail} = useContext(AuthContext);
  const updateProfile = async (name, password) => {
    setModalVisible(true);
    await update(name);
    if (password !== '') {
      await changePassword(password);
    }
    await changeEmail(email);
    navigation.goBack();
    setModalVisible(false);
  };
  //   console.log(routes.params.name, routes.params.email);
  return (
    <View>
      <CustomTextInput
        placeholder={name}
        value={name}
        onChangeText={txt => {
          setName(txt);
        }}
        icon={require('../images/user.png')}
      />
      <CustomTextInput
        placeholder={email}
        value={email}
        onChangeText={txt => {
          setEmail(txt);
        }}
        icon={require('../images/email.png')}
      />
      {/* <CustomTextInput
        placeholder={'Phone number'}
        value={phoneNumber}
        onChangeText={txt => {
          setPhoneNumber(txt);
        }}
        icon={require('../images/contact.png')}
      /> */}
      <CustomTextInput
        placeholder={'password'}
        value={password}
        onChangeText={txt => {
          setPassword(txt);
        }}
        icon={require('../images/lock.png')}
      />
      <CustomTextInput
        placeholder={'confirm password'}
        value={confirmPassword}
        onChangeText={txt => {
          setConfirmPassword(txt);
        }}
        icon={require('../images/lock.png')}
      />
      <CommonButton
        title={'Update Profile'}
        bgColor={'#000'}
        textColor={'#fff'}
        onPress={() => {
          if (
            name == '' ||
            password !== confirmPassword ||
            password == '' ||
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
          ) {
            alert('Please enter valid name, email and password');
          } else {
            updateProfile(name, password, email);
          }
        }}
      />
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

export default EditProfile;
