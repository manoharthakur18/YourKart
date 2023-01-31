import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CommonButton from '../commonFiles/CommonButton';
import RazorpayCheckout from 'react-native-razorpay';
import {useNavigation} from '@react-navigation/native';
import {addOrder} from './redux/actions/Actions';
import Coupon from './Coupon';

const Checkout = () => {
  const cartData = useSelector(state => state.Reducers.cartBasket);
  // console.log(cartData);
  const addressList = useSelector(state => state.AddressReducer);
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState('');
  const navigation = useNavigation();
  const [totalPrice, setTotalPrice] = useState();
  const [voucher, setVoucher] = useState(true);
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const handleRazorpayPayment = () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_0hE4fShT1FxgWO',
      amount: '' + totalPrice * 100,
      name: 'Acme Corp',
      order_id: 'order_DslnoIgkIDL8Zt', //Replace this with an order_id created using Orders API.
      prefill: {
        email: 'manohar@example.com',
        contact: '9191919191',
        name: 'Manohar Thakur',
      },
      theme: {color: '#53a20e'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
        dispatch(
          addOrder({
            items: cartData,
            total: totalPrice(),
            address: selectedAddress,
          }),
        );
        navigation.navigate('OrderStatus', {status: 'success'});
      })
      .catch(error => {
        // handle failure
        // alert(`Error: ${error.code} | ${error.description}`);
        navigation.navigate('OrderStatus', {status: 'failed'});
      });
  };

  useEffect(() => {
    tempTotal = 0;
    cartData.map(item => {
      tempTotal = tempTotal + parseInt(item.price * item.qty);
    });
    setTotalPrice(tempTotal);
  }, [cartData]);
  // const totalPrice = () => {
  //   tempTotal = 0;
  //   cartData.map(item => {
  //     tempTotal = tempTotal + parseInt(item.price * item.qty);
  //   });
  //   return tempTotal;
  // };
  const deliveryCharge = 40;
  return (
    <ScrollView>
      <View style={{flex: 1, marginBottom: 110}}>
        <View>
          {cartData.map((item, key) => (
            <View
              style={{
                width: '95%',
                height: 100,
                flexDirection: 'row',
                borderRadius: 10,
                backgroundColor: '#fff',
                elevation: 5,
                marginTop: 5,
                marginBottom: 10,
                marginLeft: 10,
              }}
              key={key}>
              <Image
                source={item.image}
                style={{
                  width: 100,
                  height: 100,
                  marginLeft: 10,
                  resizeMode: 'contain',
                }}
              />
              <View style={{paddingLeft: 20, padding: 10}}>
                <Text style={{fontSize: 24, fontWeight: '900'}}>
                  {item.name}
                </Text>
                <View
                  style={{
                    padding: 10,
                    width: 240,

                    marginRight: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 20, fontWeight: '600'}}>
                    {'₹' + item.price * item.qty}
                  </Text>
                  <Text style={{fontSize: 20, fontWeight: '600'}}>
                    {'Qty: ' + item.qty}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderRadius: 10,
            margin: 5,
            paddingBottom: 5,
          }}>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 10,
              fontWeight: '600',
              marginBottom: 5,
            }}>
            Coupons
          </Text>
          {voucher === true ? (
            <Coupon
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              setVoucher={setVoucher}
              setAppliedCoupon={setAppliedCoupon}
            />
          ) : (
            <Text
              style={{
                fontSize: 18,
                marginLeft: 10,
                fontWeight: '600',
              }}>
              Coupon Applied: {appliedCoupon}
            </Text>
          )}
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderRadius: 10,
            margin: 5,
            paddingBottom: 5,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: 30,
              paddingRight: 30,
            }}>
            <Text style={{fontSize: 20, fontWeight: '600'}}>
              Delivery Charge:
            </Text>
            {totalPrice > 1000 ? (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  textDecorationLine: 'line-through',
                }}>
                {'₹' + deliveryCharge}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                }}>
                {'₹' + deliveryCharge}
              </Text>
            )}
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: 30,
              paddingRight: 30,
            }}>
            <Text style={{fontSize: 20, fontWeight: '600'}}>Total: </Text>
            <Text style={{fontSize: 20, fontWeight: '600'}}>
              {totalPrice > 1000
                ? '₹' + totalPrice
                : '₹' + (totalPrice + deliveryCharge)}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderRadius: 10,
            margin: 5,
          }}>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 15,
              fontWeight: '600',
            }}>
            Addresses
          </Text>
          {addressList.length ? (
            <FlatList
              data={addressList}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text style={{marginLeft: 20, fontSize: 16}}>
                        {'Name: ' + item.name}
                      </Text>
                      <Text style={{marginLeft: 20, fontSize: 16}}>
                        {'House Name: ' + item.houseName}
                      </Text>
                      <Text style={{marginLeft: 20, fontSize: 16}}>
                        {'City: ' + item.city}
                      </Text>
                      <Text style={{marginLeft: 20, fontSize: 16}}>
                        {'Pin code: ' + item.pinCode}
                      </Text>
                      <Text
                        style={{
                          marginLeft: 20,
                          marginBottom: 10,
                          fontSize: 16,
                        }}>
                        {'Contact: ' + item.contactNumber}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        marginRight: 20,
                        padding: 7,
                        borderWidth: 0.3,
                      }}
                      onPress={() => {
                        setSelectedAddress(
                          'Name: ' +
                            item.name +
                            ', city: ' +
                            item.city +
                            ', pin code: ' +
                            item.pinCode +
                            ', contact: ' +
                            item.contactNumber,
                        );
                      }}>
                      <Text>Select</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          ) : (
            <Text
              style={{
                marginLeft: 20,
                marginRight: 20,
                fontSize: 17,
                fontWeight: '500',
              }}>
              Please add an address to your account
            </Text>
          )}
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderRadius: 10,
            margin: 5,
            paddingBottom: 5,
          }}>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 20,
              fontWeight: '600',
            }}>
            Selected Address
          </Text>
          <Text
            style={{
              marginLeft: 20,
              marginRight: 20,
              fontSize: 17,
              fontWeight: '500',
            }}>
            {selectedAddress == ''
              ? 'Please select an address'
              : selectedAddress}
          </Text>
        </View>
        <CommonButton
          title={'Buy Now'}
          bgColor={'#F7A200'}
          textColor={'#000'}
          onPress={() => {
            {
              selectedAddress !== ''
                ? handleRazorpayPayment()
                : alert('Please select an address');
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Checkout;
