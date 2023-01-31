import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import AuthProvider from './src/authentication/AuthProvider';
import Routes from './src/authentication/Routes';
import Store from './src/Screens/redux/store/Store';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={Store}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Provider>
  );
};

export default App;
