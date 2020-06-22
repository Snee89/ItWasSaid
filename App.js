import 'react-native-gesture-handler';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { MyStack } from './android/app/src/routes/homeStack';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'Require cycle:',
]);
export default function App() {
  //SplashScreen.hide();

  return (
    <MyStack />
  )
}


