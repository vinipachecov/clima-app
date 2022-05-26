import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '../ui/navigators/RootNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
