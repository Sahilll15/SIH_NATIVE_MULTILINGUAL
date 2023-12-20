import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Toast from 'react-native-toast-message';
import LoginScreen from './screens/Auth/LoginScreen';
// import SignupScreen from './screens/Auth/PrisionerSignup';
// import ClientDocument from './screens/Prisioner/ClientDocument';
import PrisionerSignup from './screens/Auth/PrisionerSignup';
import HomeScreen from './screens/HomeScreen';
import LawyerSignupSelection from './screens/Auth/LawyerSignup';
import LawyerHomePage from './screens/Lawyer/LawyerHomePage';
import NewClientRequest from './screens/Lawyer/NewClientRequest';
import ClientCaseDetail from './screens/Lawyer/ClientCaseDetail';
import PrisonerIntro from './screens/Prisioner/PrisonerIntro';
import CaseDashboard from './screens/Prisioner/CaseDashboard';
import LegalAssistance from './screens/Prisioner/LegalAssistance';
import AddDoc from './screens/Prisioner/AddDoc';
import LawyerListPage from './screens/Prisioner/LawyerListPage';
import LandingPage from './screens/LandingPage';
import GuardHomePage from './screens/Guard/GuardHomePage';
import PrisonerListPage from './screens/Guard/PrisonerListPage';
import CaseDetail from './screens/Prisioner/CaseDetail';
import { AuthProvider } from './Context/AuthContext';
import { FirProvider } from './Context/FirContext';
import ExistingClient from './screens/Lawyer/ExistingClient';
import ChatBot from './screens/ChatBot/ChatBot';
import Bottom from './screens/Navigation/Bottom';
import PoliceLand from './screens/Police/PoliceLand';
import Fir from './screens/Police/Fir';
import SearchFir from './screens/Police/SearchFir';
import CourtHome from './screens/Court/CourtHome';
import NewCase from './screens/Court/NewCase';
import ExistingCase from './screens/Court/ExistingCase';
import CaseChat from './screens/Court/CaseChat';
import NewCaseDoc from './screens/Court/NewCaseDoc';
import PdfViewer from './screens/PdfViewer';
import ChatScreen from './screens/Chat/ChatScreen';
import YourCase from './screens/Prisioner/YourCase';
import YourCaseDescription from './screens/Prisioner/YourCaseDescription';
import Rehab from './screens/Prisioner/Rehab';
import { LawyerProvider } from './Context/LawyerContext';
import SignUpSelection from './screens/Auth/SignUpSelection';
import LawyerSignup from './screens/Auth/LawyerSignup';
import Land from './screens/Land';
import YourApplication from './screens/Prisioner/YourApplication';
import LawyerConnect from './screens/Prisioner/LawyerConnect';
import BailList from './screens/Court/BailList';
import BailDetail from './screens/Court/BailDetail';
import LawyerDetailsPage from './screens/Prisioner/LawyerSelect';
import Rights from './screens/Prisioner/Rights';
import Bot from './screens/Bot';
import ClientDocument from './screens/Prisioner/ClientDocument';
import TestClient from './screens/Lawyer/TestClient';


import PrisonerLawyer from './screens/Guard/PrisonerLawyer';
// import ChatBot from './screens/ChatBot/ChatBot';
const Stack = createNativeStackNavigator();
// new@gmail.com
// new

export default function App() {
  return (
    <AuthProvider>
      <FirProvider>
        <LawyerProvider>


          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name='Land' component={Land} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Rights" component={Rights} />
              <Stack.Screen name="Bot" component={Bot} />

              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="LawyerSignup" component={LawyerSignup} />
              <Stack.Screen name="SignUpSelection" component={SignUpSelection} />
              {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
              <Stack.Screen name="PrisionerSignup" component={PrisionerSignup} />
              {/* <Stack.Screen name="ClientDocument" component={ClientDocument} /> */}

              <Stack.Screen name="LawyerSignupSelection" component={LawyerSignupSelection} />
              <Stack.Screen name="LawyerHomePage" component={LawyerHomePage} />
              <Stack.Screen name="NewClientRequest" component={NewClientRequest} />
              <Stack.Screen name="ClientCaseDetail" component={ClientCaseDetail} />
              <Stack.Screen name="CaseDetail" component={CaseDetail} />
              <Stack.Screen name="CaseDashboard" component={CaseDashboard} />
              <Stack.Screen name="PrisonerIntro" component={PrisonerIntro} />
              <Stack.Screen name="LegalAssistance" component={LegalAssistance} />
              <Stack.Screen name="AddDoc" component={AddDoc} />
              <Stack.Screen name="LawyerListPage" component={LawyerListPage} />
              <Stack.Screen name="LawyerSelect" component={LawyerDetailsPage} />
              <Stack.Screen name="LandingPage" component={LandingPage} />
              <Stack.Screen name="ExistingClient" component={ExistingClient} />
              <Stack.Screen name="GuardHomePage" component={GuardHomePage} />
              <Stack.Screen name="PrisonerListPage" component={PrisonerListPage} />
              <Stack.Screen name="PoliceLand" component={PoliceLand} />
              <Stack.Screen name="Fir" component={Fir} />
              <Stack.Screen name="CourtHome" component={CourtHome} />
              <Stack.Screen name="SearchFir" component={SearchFir} />
              <Stack.Screen name="NewCase" component={NewCase} />
              <Stack.Screen name="ChatBot" component={ChatBot} />
              <Stack.Screen name="ExistingCase" component={ExistingCase} />
              <Stack.Screen name="CaseChat" component={CaseChat} />
              <Stack.Screen name="NewCaseDoc" component={NewCaseDoc} />
              <Stack.Screen name="PdfViewer" component={PdfViewer} />
              <Stack.Screen name="ChatScreen" component={ChatScreen} />
              <Stack.Screen name="YourCase" component={YourCase} />
              <Stack.Screen name="YourCaseDescription" component={YourCaseDescription} />
              <Stack.Screen name="Rehab" component={Rehab} />
              <Stack.Screen name="YourApplication" component={YourApplication} />
              <Stack.Screen name="LawyerConnect" component={LawyerConnect} />
              <Stack.Screen name="BailList" component={BailList} />
              <Stack.Screen name="BailDetail" component={BailDetail} />
            </Stack.Navigator>
            <Bottom />
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </NavigationContainer>
        </LawyerProvider>
      </FirProvider>
    </AuthProvider>
  );
}



