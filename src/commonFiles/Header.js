import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 0.09,
        flexDirection: 'row',
        backgroundColor: '#1abc9c',
      }}>
      <Image
        source={require('../images/yklogo.png')}
        style={{width: 50, height: 50, marginTop: 6, marginLeft: 25}}
      />
      <Text
        style={{
          marginTop: 6,
          fontSize: 34,
          fontWeight: '800',
          color: '#000',
          paddingLeft: 50,
        }}>
        YourKart
      </Text>
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          marginTop: 15,
          marginLeft: 80,
        }}
        onPress={() => {
          navigation.navigate('SearchFilter');
        }}>
        <Image
          source={require('../images/search.png')}
          style={{width: 28, height: 28}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
