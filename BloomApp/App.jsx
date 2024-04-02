import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import styles from './styles';
import { NavigationContainer } from '@react-navigation/native';
import UserContext from './Context';
import { getData } from './functions/asyncstorage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from './screens/LogInScreen';

const Stack = createNativeStackNavigator()

export default function App() {

  const [user, setUser] = useState()

  const getUser = async () => {
    let localUser = await getData('user')
    localUser && setUser(localUser)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
      <UserContext.Provider value={{ user, setUser }}>
          <NavigationContainer>
            <Stack.Navigator>
              {
                user ? (
                  <>
                    <Stack.Screen name='Home' component={LogInScreen}/>
                  </>
                ) : (
                  <>
                    <Stack.Screen name='Log In' component={LogInScreen} options={{headerShown: false}}/>
                  </>
                )
              }
              
            </Stack.Navigator>
          </NavigationContainer>
      </UserContext.Provider>
  );
}
