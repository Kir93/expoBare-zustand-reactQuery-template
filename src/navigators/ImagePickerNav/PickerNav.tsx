import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';

import Picker from '@screens/Picker/Picker';
import Albums from '@screens/Picker/Albums';

import { CloseIcon, HeaderTitleText, HeaderTitleWrapper, MoreIcon } from './styles';
import { TouchableOpacity } from 'react-native';

export type AlbumsStackNavParamList = {
  Picker?: { album?: string; id?: string };
  Albums: { album?: string; id?: string; multiple?: boolean };
  MainTabNav?: { image?: string | string[] };
};

export type AlbumsRouteProp = RouteProp<
  { Albums: { album?: string; id?: string; multiple?: boolean } },
  'Albums'
>;

const Stack = createStackNavigator();

const PickerNav = () => {
  const navigation = useNavigation<StackNavigationProp<AlbumsStackNavParamList>>();
  const { params } = useRoute();
  const headerLeft = () => (
    <TouchableOpacity onPress={() => navigation.navigate('MainTabNav')}>
      <CloseIcon name="close" size={24} />
    </TouchableOpacity>
  );
  const headerTitle = () => {
    const route = useRoute<{ key: string; name: string; params: { album: string } }>();
    const {
      name,
      params: { album },
    } = route;
    return (
      <HeaderTitleWrapper
        onPress={() =>
          navigation.navigate(name !== 'Albums' ? 'Albums' : 'Picker', {
            album: album ?? '최근 항목',
          })
        }
      >
        <HeaderTitleText>{album ?? '최근 항목'}</HeaderTitleText>
        <MoreIcon name={`caret-${name !== 'Albums' ? 'down' : 'up'}`} size={8} />
      </HeaderTitleWrapper>
    );
  };

  const screenOptions: StackNavigationOptions = {
    headerBackTitleVisible: false,
    headerMode: 'float',
    presentation: 'modal',
    headerLeft,
    headerTitle,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Picker" component={Picker} initialParams={params} />
      <Stack.Screen name="Albums" component={Albums} />
    </Stack.Navigator>
  );
};

export default PickerNav;
