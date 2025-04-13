import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import Governor screens
import GovernorCases from '../screens/Governor/GovernorCases';
import GovernorAnalytics from '../screens/Governor/GovernorAnalytics';
import GovernorReports from '../screens/Governor/GovernorReports';
import GovernorApprovals from '../screens/Governor/GovernorApprovals';
import GovernorNotifications from '../screens/Governor/GovernorNotifications';
import GovernorModifications from '../screens/Governor/GovernorModifications';

const Stack = createStackNavigator();

const GovernorNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="GovernorCases"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="GovernorCases" component={GovernorCases} />
      <Stack.Screen name="GovernorAnalytics" component={GovernorAnalytics} />
      <Stack.Screen name="GovernorReports" component={GovernorReports} />
      <Stack.Screen name="GovernorApprovals" component={GovernorApprovals} />
      <Stack.Screen name="GovernorNotifications" component={GovernorNotifications} />
      <Stack.Screen name="GovernorModifications" component={GovernorModifications} />
    </Stack.Navigator>
  );
};

export default GovernorNavigator;
