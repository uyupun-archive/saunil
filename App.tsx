import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Top } from './src/pages/top';
import { Aufguss } from './src/pages/aufguss';
import { Loyly } from './src/pages/loyly';
import { StackNavigator } from './src/types/stackNavigator';

const Stack = createNativeStackNavigator<StackNavigator>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Top">
        <Stack.Screen
          name="Top"
          component={Top}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Aufguss"
          component={Aufguss}
          options={{ title: 'アウフグースモード', headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="Loyly"
          component={Loyly}
          options={{ title: 'ロウリュモード', headerTitleAlign: 'center' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
