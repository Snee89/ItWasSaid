import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QuoteScreen from '../screens/QuoteScreen';
import QuoteEditor from '../screens/QuoteEditor';
import PixabayScreen from '../screens/PixabayScreen';
import CameraComponent2 from '../components/imagesComponent';

const Stack = createStackNavigator();
const ModalStack = createStackNavigator();

export function MyStack() {
     return (
          <NavigationContainer>
               <Stack.Navigator>
                    <Stack.Screen
                         name="QuoteScreen"
                         component={QuoteScreen}
                         options={{
                              title: 'Your Daily Quote',
                              headerStyle: {
                                   backgroundColor: 'darkgreen',
                              },
                              headerTitleStyle: {
                                   fontWeight: 'bold',
                                   fontFamily: 'monospace',
                                   fontStyle: 'italic',
                                   marginLeft: '20%',
                                   color: 'white'
                              },


                         }}
                    />
                    <Stack.Screen
                         name="Choose an Image"
                         component={PixabayScreen}
                         options={{
                              title: 'Choose an Image',
                              headerRight: () => (
                                   <CameraComponent2 />
                              ),
                              headerTitleStyle: {
                                   fontWeight: 'bold',
                                   fontFamily: 'monospace',
                                   fontStyle: 'italic',
                                   color: 'white'
                              },
                              headerStyle: {
                                   backgroundColor: 'darkgreen',
                              },
                              headerTintColor: 'white'
                         }}
                    />

                    <Stack.Screen
                         name="QuoteEditor"
                         component={QuoteEditor}
                         options={{
                              title: 'Quote Creator',
                              headerTitleStyle: {
                                   fontWeight: 'bold',
                                   fontFamily: 'monospace',
                                   fontStyle: 'italic',
                                   color: 'white',
                                   marginLeft: '15%',

                              },
                              headerStyle: {
                                   backgroundColor: 'darkgreen',
                              },
                              headerTintColor: 'white'
                         }}
                    />
               </Stack.Navigator>
          </NavigationContainer>
     );
}
export default function HomeStack() {
     return (
          <NavigationContainer>
               <Stack.Navigator
                    headerMode='none'
                    mode='modal'
               >
                    <ModalStack.Screen
                         name="Images"
                         component={CameraComponent}

                    />
               </Stack.Navigator>
          </NavigationContainer>
     )
}

