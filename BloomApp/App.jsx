import React, { useEffect, useState } from 'react';
import CreateAccountScreen from './screens/CreateAccountScreen'
import { NavigationContainer } from '@react-navigation/native';
import UserContext from './Context';
import { getData } from './functions/asyncstorage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogInScreen from './screens/LogInScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

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
        {
          user ? (
            <Tab.Navigator>
              <Tab.Group>
                <Tab.Screen name='Home' component={HomeScreen}/>
                <Tab.Screen name='Profile' component={ProfileScreen}/>
              </Tab.Group>
            </Tab.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen name='Log In' component={LogInScreen} options={{headerShown: false}}/>
              <Stack.Screen name='Create Account' component={CreateAccountScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
          )
        }
      </NavigationContainer>
    </UserContext.Provider>
  );
}
