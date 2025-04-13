import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import chat screens
import ConversationsScreen from '../screens/Chat/ConversationsScreen';
import ChatDetailScreen from '../screens/Chat/ChatDetailScreen';
import FindLawyerScreen from '../screens/Chat/FindLawyerScreen';

const Stack = createStackNavigator();

const ChatNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Conversations"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Conversations" component={ConversationsScreen} />
      <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
      <Stack.Screen name="FindLawyer" component={FindLawyerScreen} />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
