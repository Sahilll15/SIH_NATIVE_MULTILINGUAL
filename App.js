// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Auth/LoginScreen';
import SignupScreen from './screens/Auth/SignupScreen';
import SignUpSelection from './screens/Auth/SignUpSelection';

import LawyerSignupSelection from './screens/Lawyer/LawyerSignupselection';
import LawyerHomePage from './screens/Lawyer/LawyerHomePage';
import NewClientRequest from'./screens/Lawyer/NewClientRequest';
import ClientCaseDetail from'./screens/Lawyer/ClientCaseDetail';
import PrisonerIntro from './screens/Prisioner/PrisonerIntro';
import CaseDashboard from './screens/Prisioner/CaseDashboard';
import LegalAssistance from './screens/Prisioner/LegalAssistance';
import AddDoc from './screens/Prisioner/AddDoc';
import LawyerListPage from './screens/Prisioner/LawyerListPage';
import LawyerSelect from './screens/Prisioner/LawyerSelect';
import LandingPage from './screens/LandingPage';
import CaseDetail from './screens/Prisioner/CaseDetail';





const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>


      <Stack.Navigator initialRouteName="CaseDetail">



        {/* <Stack.Screen name="Home" component={HomeScreen}  /> */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="SignUpSelection" component={SignUpSelection} options={{ headerShown: false }} />
        <Stack.Screen name="LawyerSignupSelection" component={LawyerSignupSelection} options={{ headerShown: false }} />
        <Stack.Screen name="LawyerHomePage" component={LawyerHomePage} options={{ headerShown: false }} />
        <Stack.Screen name="NewClientRequest" component={NewClientRequest}/>
        <Stack.Screen name="ClientCaseDetail" component={ClientCaseDetail}options={{ headerShown: false }}/>
        <Stack.Screen name="CaseDetail" component={CaseDetail}options={{ headerShown: false }}/>
        <Stack.Screen name="CaseDashboard" component={CaseDashboard}options={{ headerShown: false }}/>

        <Stack.Screen name="PrisonerIntro" component={PrisonerIntro} options={{ headerShown: false }}/>  
        <Stack.Screen name="LegalAssistance" component={LegalAssistance}/>
        <Stack.Screen name="AddDoc" component={AddDoc} options={{ headerShown: false }}/>        
        <Stack.Screen name="LawyerListPage" component={LawyerListPage} options={{ headerShown: false }}/>
        <Stack.Screen name="LawyerSelect" component={LawyerSelect} options={{ headerShown: false }}/>
        <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }}/>

           

      </Stack.Navigator>

    </NavigationContainer>
  );
}
