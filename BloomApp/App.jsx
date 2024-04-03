import React, { useEffect, useState } from 'react';
import CreateAccountScreen from './screens/CreateAccountScreen'
import { NavigationContainer } from '@react-navigation/native';
import UserContext from './Context';
import { getData } from './functions/asyncstorage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from './screens/LogInScreen';
import HomeScreen from './screens/HomeScreen';

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
                    <Stack.Screen name='Home' component={HomeScreen}/>
                  </>
                ) : (
                  <>
                    <Stack.Screen name='Log In' component={LogInScreen} options={{headerShown: false}}/>
                    <Stack.Screen name='Create Account' component={CreateAccountScreen} options={{headerShown: false}}/>
                  </>
                )
              }
              
            </Stack.Navigator>
          </NavigationContainer>
      </UserContext.Provider>
  );
}
