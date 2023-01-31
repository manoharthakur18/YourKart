import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Login from './Login';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 40, fontWeight: 'bold', color: '#730018'}}>
        Welcome
      </Text>
      <Image
        source={require('../images/yklogo.png')}
        style={{width: 200, height: 200, marginTop: 20}}
      />
    </View>
  );
};

export default Splash;
