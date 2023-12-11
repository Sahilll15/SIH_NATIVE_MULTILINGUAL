// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SignUpSelection from './screens/SignUpSelection';
import LawyerSignupSelection from './screens/Lawyer/LawyerSignupselection';
import LawyerHomePage from './screens/Lawyer/LawyerHomePage';
import NewClientRequest from'./screens/Lawyer/NewClientRequest';
import ClientCaseDetail from'./screens/Lawyer/ClientCaseDetail';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ClientCaseDetail">
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="SignUpSelection" component={SignUpSelection} options={{ headerShown: false }} />
        <Stack.Screen name="LawyerSignupSelection" component={LawyerSignupSelection} options={{ headerShown: false }} />
        <Stack.Screen name="LawyerHomePage" component={LawyerHomePage} options={{ headerShown: false }} />
        <Stack.Screen name="NewClientRequest" component={NewClientRequest} options={{ headerShown: false }} />
        <Stack.Screen name="ClientCaseDetail" component={ClientCaseDetail} />      
      </Stack.Navigator>

    </NavigationContainer>
  );
}
