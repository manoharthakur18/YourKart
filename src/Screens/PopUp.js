import {View, Text, Dimensions, Modal} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
const {height, width} = Dimensions.get('window');
const PopUp = () => {
  const [visible, setVisible] = useState(true);
  return (
    <View style={{flex: 1}}>
      <Modal visible={visible} transparent={true}>
        <View
          style={{
            width: width,
            height: height,
            position: 'absolute',
            top: 0,
            backgroundColor: 'rgba(0,0,0,.7)',
          }}>
          <View
            style={{
              position: 'absolute',
              right: 20,
              bottom: 50,
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#fff',
                    fontWeight: '700',
                  }}>
                  Sale
                </Text>
                <Text style={{fontSize: 20, color: '#fff', fontWeight: '700'}}>
                  Limited Offer
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                }}>
                <Image
                  source={require('../images/close.png')}
                  style={{
                    width: 24,
                    height: 24,
                    marginLeft: 40,
                    tintColor: '#fff',
                  }}
                />
              </TouchableOpacity>
            </View>
            <Image
              source={require('../images/sale-tag.png')}
              style={{width: 200, height: 200}}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PopUp;
