import {View, Text, Image} from 'react-native';
import React, {useContext, useState} from 'react';
import CustomTextInput from '../commonFiles/CustomTextInput';
import CommonButton from '../commonFiles/CommonButton';
import Loader from '../commonFiles/Loader';
import {AuthContext} from '../authentication/AuthProvider';

const Login = ({navigation}) => {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const validate = () => {
    if (email == '' && password == '') {
      alert('please enter email and password');
    } else if (email == '') {
      alert('Please enter email id');
    } else if (password == '') {
      alert('Please enter password');
    } else {
      setModalVisible(true);
      setTimeout(async () => {
        await login(email, password);
        setModalVisible(false);
      }, 2000);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../images/yklogo.png')}
        style={{width: 100, height: 100, alignSelf: 'center', marginTop: 100}}
      />
      <Text
        style={{
          marginTop: 30,
          alignSelf: 'center',
          fontSize: 24,
          fontWeight: '800',
          color: '#000',
        }}>
        Log in
      </Text>
      <CustomTextInput
        placeholder={'Enter email id'}
        icon={require('../images/email.png')}
        value={email}
        onChangeText={txt => {
          setEmail(txt);
        }}
      />

      <CustomTextInput
        placeholder={'Enter Password'}
        type="password"
        icon={require('../images/lock.png')}
        value={password}
        onChangeText={txt => {
          setPassword(txt);
        }}
      />
      <CommonButton
        title={'Log in'}
        bgColor={'#000'}
        textColor={'#fff'}
        onPress={() => {
          validate();
        }}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: '800',
          alignSelf: 'center',
          marginTop: 20,
          textDecorationLine: 'underline',
          color: '#00085b',
        }}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        Create New Account?
      </Text>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

export default Login;
