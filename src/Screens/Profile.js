import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useContext, Component} from 'react';
import {AuthContext} from '../authentication/AuthProvider';
import CommonButton from '../commonFiles/CommonButton';
import {firebase} from '@react-native-firebase/firestore';

export default class Profile extends Component {
  static contextType = AuthContext;
  constructor() {
    super();
    this.state = {
      newData: [],
    };
  }
  componentDidMount() {
    firebase
      .firestore()
      .collection('Users')
      .doc('btG9hNRoFvf5kOvxgB5A')
      .get()
      .then(snapshot => {
        this.setState({newData: snapshot.data()});
        console.log(this.state.newData);
      });
  }

  render() {
    return (
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, marginBottom: 110}}>
          <Image
            source={{uri: this.context.user.photoURL}}
            style={{
              width: 150,
              height: 150,
              alignSelf: 'center',
              borderRadius: 10,
              marginTop: 25,
            }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                marginTop: 25,
                marginLeft: 20,
                fontSize: 30,
                fontWeight: '800',
                color: '#000',
              }}>
              {this.context.user.displayName}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#8e8e8e',
                justifyContent: 'center',
                alignItems: 'center',
                width: '20%',
                height: 40,
                borderRadius: 20,
                marginTop: 25,
                marginRight: 10,
              }}
              onPress={() => {
                this.props.navigation.navigate('EditProfile', {
                  name: this.context.user.displayName,
                  email: this.context.user.email,
                });
              }}>
              <Text style={{color: '#fff', fontSize: 20}}>Edit</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 20,
              // alignSelf: 'center',
              fontWeight: '600',
              marginLeft: 20,
              color: '#000',
            }}>
            {this.context.user.email}
          </Text>
          <Text
            style={{
              fontSize: 20,
              // alignSelf: 'center',
              fontWeight: '600',
              marginLeft: 20,
              color: '#000',
            }}>
            Phone:-
            {this.state.newData ? this.state.newData['Phone no.'] : ''}
          </Text>

          <TouchableOpacity
            style={{
              width: '90%',
              height: 30,
              borderBottomWidth: 0.3,
              marginTop: 20,
              alignSelf: 'center',
              justifyContent: 'center',
              borderBottomColor: '#8e8e8e',
            }}
            onPress={() => {
              this.props.navigation.navigate('MyAddress');
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '800',
                // alignSelf: 'center',
                color: '#00085b',
              }}>
              My Address
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '90%',
              height: 30,
              borderBottomWidth: 0.3,
              marginTop: 20,
              alignSelf: 'center',
              justifyContent: 'center',
              borderBottomColor: '#8e8e8e',
            }}
            onPress={() => {
              this.props.navigation.navigate('MyOrders');
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '800',
                // alignSelf: 'center',
                color: '#00085b',
              }}>
              My Orders
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              width: '90%',
              borderBottomWidth: 0.2,
              borderBottomColor: '#8e8e8e',
              fontSize: 20,
              fontWeight: '800',
              alignSelf: 'center',
              // textAlign: 'center',
              marginTop: 15,
              color: '#00085b',
            }}
            onPress={() => {
              this.props.navigation.navigate('Cart');
            }}>
            Go to Cart
          </Text>
          <Text
            style={{
              width: '90%',
              borderBottomWidth: 0.2,
              borderBottomColor: '#8e8e8e',
              fontSize: 20,
              fontWeight: '800',
              alignSelf: 'center',
              // textAlign: 'center',
              marginTop: 15,
              color: '#00085b',
            }}
            onPress={() => {
              this.props.navigation.navigate('WishList');
            }}>
            WishList
          </Text>
          <CommonButton
            title={'Log out'}
            bgColor={'#FF0000'}
            textColor={'#fff'}
            onPress={() => {
              this.context.logout();
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

// const Profile = ({navigation}) => {
//   const {user, logout} = useContext(AuthContext);

//   return (
//     <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
//       <View style={{flex: 1, marginBottom: 110}}>
//         <Image
//           source={{uri: user.photoURL}}
//           style={{
//             width: 150,
//             height: 150,
//             alignSelf: 'center',
//             borderRadius: 10,
//             marginTop: 25,
//           }}
//         />
//         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//           <Text
//             style={{
//               marginTop: 25,
//               marginLeft: 20,
//               fontSize: 30,
//               fontWeight: '800',
//               color: '#000',
//             }}>
//             {user.displayName}
//           </Text>
//           <TouchableOpacity
//             style={{
//               backgroundColor: '#8e8e8e',
//               justifyContent: 'center',
//               alignItems: 'center',
//               width: '20%',
//               height: 40,
//               borderRadius: 20,
//               marginTop: 25,
//               marginRight: 10,
//             }}
//             onPress={() => {
//               navigation.navigate('EditProfile', {
//                 name: user.displayName,
//                 email: user.email,
//               });
//             }}>
//             <Text style={{color: '#fff', fontSize: 20}}>Edit</Text>
//           </TouchableOpacity>
//         </View>
//         <Text
//           style={{
//             fontSize: 20,
//             // alignSelf: 'center',
//             fontWeight: '600',
//             marginLeft: 20,
//             color: '#000',
//           }}>
//           {user.email}
//         </Text>
//         <Text
//           style={{
//             fontSize: 20,
//             // alignSelf: 'center',
//             fontWeight: '600',
//             marginLeft: 20,
//             color: '#000',
//           }}>
//           {user.phoneNumber}
//         </Text>

//         <TouchableOpacity
//           style={{
//             width: '90%',
//             height: 30,
//             borderBottomWidth: 0.3,
//             marginTop: 20,
//             alignSelf: 'center',
//             justifyContent: 'center',
//             borderBottomColor: '#8e8e8e',
//           }}
//           onPress={() => {
//             navigation.navigate('MyAddress');
//           }}>
//           <Text
//             style={{
//               fontSize: 20,
//               fontWeight: '800',
//               // alignSelf: 'center',
//               color: '#00085b',
//             }}>
//             My Address
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{
//             width: '90%',
//             height: 30,
//             borderBottomWidth: 0.3,
//             marginTop: 20,
//             alignSelf: 'center',
//             justifyContent: 'center',
//             borderBottomColor: '#8e8e8e',
//           }}
//           onPress={() => {
//             navigation.navigate('MyOrders');
//           }}>
//           <Text
//             style={{
//               fontSize: 20,
//               fontWeight: '800',
//               // alignSelf: 'center',
//               color: '#00085b',
//             }}>
//             My Orders
//           </Text>
//         </TouchableOpacity>
//         <Text
//           style={{
//             width: '90%',
//             borderBottomWidth: 0.2,
//             borderBottomColor: '#8e8e8e',
//             fontSize: 20,
//             fontWeight: '800',
//             alignSelf: 'center',
//             // textAlign: 'center',
//             marginTop: 15,
//             color: '#00085b',
//           }}
//           onPress={() => {
//             navigation.navigate('Cart');
//           }}>
//           Go to Cart
//         </Text>
//         <Text
//           style={{
//             width: '90%',
//             borderBottomWidth: 0.2,
//             borderBottomColor: '#8e8e8e',
//             fontSize: 20,
//             fontWeight: '800',
//             alignSelf: 'center',
//             // textAlign: 'center',
//             marginTop: 15,
//             color: '#00085b',
//           }}
//           onPress={() => {
//             navigation.navigate('WishList');
//           }}>
//           WishList
//         </Text>
//         <CommonButton
//           title={'Log out'}
//           bgColor={'#FF0000'}
//           textColor={'#fff'}
//           onPress={() => {
//             logout();
//           }}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// export default Profile;
