import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';

const OrderStatus = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const onPaymentFailed = () => {
    PushNotification.localNotification({
      channelId: 'your-kart', // (required)
      title: 'Payment status',
      message: 'your payment failed \nplease try again', // (required)
    });
  };
  const onPaymentSuccess = () => {
    PushNotification.localNotification({
      channelId: 'your-kart', // (required)
      title: 'Payment status',
      message: 'your payment is successfully completed\n\nYour order is placed', // (required)
    });
  };

  // const scheduleNotification = () => {
  //   PushNotification.localNotificationSchedule({
  //     channelId: 'your-kart',
  //     title: 'Schedule Notification',
  //     message: 'This is shown after 5 seconds',
  //     date: new Date(Date.now() + 5 * 1000),
  //     allowWhileIdle: true,
  //   });
  // };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={
          route.params.status == 'success'
            ? require('../images/success.png')
            : require('../images/failed.png')
        }
        style={{width: 50, height: 50}}
      />
      <Text style={{fontSize: 20, marginTop: 20}}>
        {route.params.status == 'success'
          ? `Your Order placed sucessfully! ${onPaymentSuccess()}`
          : `Order Failed ${onPaymentFailed()}`}
      </Text>

      <TouchableOpacity
        style={{
          marginTop: 20,
          width: 200,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0.6,
        }}
        onPress={() => {
          navigation.navigate('Cart');
        }}>
        <Text>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderStatus;
