import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import User from '@screens/User/User';
import Post from '@screens/Post/Post';
import PickerNav from './ImagePickerNav/PickerNav';

const Tabs = createBottomTabNavigator();

const MainTabNav = (): React.ReactElement => (
  <Tabs.Navigator screenOptions={{ unmountOnBlur: true }}>
    <Tabs.Screen name="User" component={User} />
    <Tabs.Screen
      name="Upload"
      listeners={({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate('PickerNav', { multiple: false });
        },
      })}
      component={PickerNav}
    />
    <Tabs.Screen name="Post" component={Post} />
  </Tabs.Navigator>
);

export default MainTabNav;
