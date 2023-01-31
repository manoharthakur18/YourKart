import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {coupons} from '../data/CouponData';

const Coupon = ({totalPrice, setTotalPrice, setVoucher, setAppliedCoupon}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let tempData = [];
    coupons.data.map(Item => {
      tempData.push(Item);
    });
    setData(tempData);
  }, []);
  //   console.log(data);

  return (
    <View style={{flexDirection: 'row'}}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                padding: 5,
                borderWidth: 1,
                marginLeft: 20,
                borderRadius: 20,
              }}
              onPress={() => {
                if (totalPrice > item.discount) {
                  setTotalPrice(totalPrice - item.discount);
                  setVoucher(false);
                  setAppliedCoupon(item.title);
                } else {
                  Alert.alert(
                    'Invalid coupon',
                    'Please select valid coupon \n\nCoupon should not be more than total price',
                  );
                }
              }}>
              {/* <Text style={{fontSize: 24, fontWeight: '900'}}>
                {item.discount}
              </Text> */}

              <Text style={{fontSize: 20, fontWeight: '600'}}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Coupon;
