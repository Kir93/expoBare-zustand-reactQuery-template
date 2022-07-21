import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNav from './MainTabNav';
import PickerNav from './ImagePickerNav/PickerNav';

const Stack = createStackNavigator();

const MainNav = (): React.ReactElement => (
  <Stack.Navigator screenOptions={{ presentation: 'modal', headerShown: false }}>
    <Stack.Screen name="MainTabNav" component={MainTabNav} />
    <Stack.Screen name="PickerNav" component={PickerNav} />
  </Stack.Navigator>
);

export default MainNav;
