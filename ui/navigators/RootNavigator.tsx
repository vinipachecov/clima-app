import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CurrentLocationScreenFactory } from '@main/factories/screens/CurrentLocationScreenFactory';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LocationScreen"
        component={CurrentLocationScreenFactory}
      />
    </Stack.Navigator>
  );
};
export default RootNavigator;
