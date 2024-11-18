import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FrontEndonly from './component/FrontEndonly';
import ViewData from './component/ViewData';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Add Data">
        <Stack.Screen name="Add Data" component={FrontEndonly} />
        <Stack.Screen name="View Data" component={ViewData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
