import {View, Text} from 'react-native';
import React, {createContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            alert('Invalid email id or password');
          }
        },
        update: async name => {
          try {
            await auth().currentUser.updateProfile({
              displayName: name,
            });
          } catch (err) {
            console.log(err);
            alert('Got an error');
          }
          setUser(auth().currentUser);
        },
        changePassword: async newPassword => {
          try {
            await auth().currentUser.updatePassword(newPassword);
            console.log('Password changed successfully!');
          } catch (error) {
            console.error(error);
          }
        },
        changeEmail: async newEmail => {
          try {
            await auth().currentUser.updateEmail(newEmail);
            console.log('Email changed successfully!');
          } catch (error) {
            console.error(error);
          }
          setUser(auth().currentUser);
        },

        register: async (email, password, name, mobile, downloadURL) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                const update = {
                  displayName: name,
                  phoneNumber: 123456,
                  photoURL: downloadURL,
                };
                auth().currentUser.updateProfile(update);
              });
          } catch (e) {
            console.log(e);
            alert('please enter valid email');
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
