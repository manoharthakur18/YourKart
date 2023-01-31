import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

const CommonButton = ({onPress, title, bgColor, textColor}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: bgColor,
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        height: 50,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 40,
      }}
      onPress={() => {
        onPress();
      }}>
      <Text style={{color: textColor}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;
