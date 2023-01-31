import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import CustomTextInput from '../commonFiles/CustomTextInput';
import CommonButton from '../commonFiles/CommonButton';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../authentication/AuthProvider';
import {Avatar, Button} from 'react-native-paper';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Loader from '../commonFiles/Loader';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pic, setPic] = useState(null);
  const {register} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const validate = () => {
    if (
      email == '' ||
      password == '' ||
      name == '' ||
      mobile == '' ||
      confirmPassword == ''
    ) {
      alert('please enter all the details');
    } else if (mobile.length !== 10) {
      alert('please enter 10 digit mobile number');
    } else if (password.length < 8) {
      alert('Please enter atleast 8 character password');
    } else if (password !== confirmPassword) {
      alert('password and confirm password should be same');
    } else {
      setModalVisible(true);

      const uploadTask = storage()
        .ref()
        .child(`/userprofile/${Date.now()}`)
        .putFile(pic);
      uploadTask.on(
        'state_changed',
        snapshot => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // if (progress == 100) {
          //   alert('Image uploaded');
          // }
        },
        error => {
          alert('Error in image uploading');
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            setPic(downloadURL);
            register(email, password, name, mobile, downloadURL);
            setModalVisible(false);
          });
        },
      );

      // setTimeout(() => {
      //   register(email, password, name, mobile);
      // }, 2000);
    }
  };

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };
  const removeImage = () => {
    setPic(null);
    setToastMsg('Image Removed');
  };
  const uploadImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBased64: true,
      cameraType: 'front',
      saveToPhotos: true,
    };
    Alert.alert('Profile Image', 'Photos or Camera?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'Photos',
        onPress: () =>
          launchImageLibrary(options, Response => {
            if (Response.didCancel) {
              setToastMsg('Cacelled image selection');
            } else if (Response.errorCode == 'permission') {
              setToastMsg('Permission not satisfied');
            } else if (Response.errorCode == 'others') {
              setToastMsg(Response.errorMessage);
            } else if (Response.assets[0].fileSize > 2097152) {
              Alert.alert('Maximum size exceeded', 'choose image under 2 MB', [
                {text: 'Ok'},
              ]);
            } else {
              setPic(Response.assets[0].uri);
              // const uploadTask = storage()
              //   .ref()
              //   .child(`/userprofile/${Date.now()}`)
              //   .putFile(Response.assets[0].uri);
              // uploadTask.on(
              //   'state_changed',
              //   snapshot => {
              //     // Observe state change events such as progress, pause, and resume
              //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              //     var progress =
              //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              //     if (progress == 100) {
              //       alert('Image uploaded');
              //     }
              //   },
              //   error => {
              //     alert('Error in image uploading');
              //   },
              //   () => {
              //     // Handle successful uploads on complete
              //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              //     uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              //       setPic(downloadURL);
              //     });
              //   },
              // );
            }
          }),
      },
      {
        text: 'Camera',
        onPress: () =>
          launchCamera(options, Response => {
            if (Response.didCancel) {
              setToastMsg('Cacelled image selection');
            } else if (Response.errorCode == 'permission') {
              setToastMsg('Permission not satisfied');
            } else if (Response.errorCode == 'others') {
              setToastMsg(Response.errorMessage);
            } else {
              setPic(Response.assets[0].uri);
            }
          }),
      },
    ]);
  };

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View style={{flex: 1}}>
        <Image
          source={require('../images/yklogo.png')}
          style={{width: 80, height: 80, alignSelf: 'center', marginTop: 70}}
        />
        <Text
          style={{
            marginTop: 30,
            alignSelf: 'center',
            fontSize: 24,
            fontWeight: '600',
            color: '#000',
          }}>
          Sign up
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              marginTop: 30,
            }}>
            <Button mode="contained" onPress={() => uploadImage()}>
              Upload Image
            </Button>
            <Button
              mode="contained"
              onPress={() => removeImage()}
              style={{
                marginTop: 20,
              }}>
              Remove Image
            </Button>
          </View>
          <TouchableHighlight
            underlayColor="rgba(0,0,0,0)"
            style={{alignSelf: 'center'}}>
            <Avatar.Image size={150} source={{uri: pic}} />
          </TouchableHighlight>
        </View>
        <CustomTextInput
          placeholder={'Name'}
          value={name}
          onChangeText={txt => {
            setName(txt);
          }}
          icon={require('../images/user.png')}
        />
        <CustomTextInput
          placeholder={'Email id'}
          value={email}
          onChangeText={txt => {
            setEmail(txt);
          }}
          icon={require('../images/email.png')}
        />

        <CustomTextInput
          placeholder={'Mobile no.'}
          value={mobile}
          keyboardType={'number-pad'}
          onChangeText={txt => {
            setMobile(txt);
          }}
          icon={require('../images/contact.png')}
        />
        <CustomTextInput
          placeholder={'Password'}
          type="password"
          value={password}
          onChangeText={txt => {
            setPassword(txt);
          }}
          icon={require('../images/lock.png')}
        />
        <CustomTextInput
          placeholder={'Password'}
          type="password"
          value={confirmPassword}
          onChangeText={txt => {
            setConfirmPassword(txt);
          }}
          icon={require('../images/lock.png')}
        />
        <CommonButton
          title={'Sign up'}
          bgColor={'#0000FF'}
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
            marginBottom: 100,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          Already user?
        </Text>
      </View>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    justigyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
});

export default Signup;
