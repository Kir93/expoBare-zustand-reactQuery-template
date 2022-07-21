import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import useStore from '@reducers';

import Logo from '@assets/svgs/logo.svg';

import { ButtonText, View } from './User.styles';

const User = (): React.ReactElement => {
  const navigation = useNavigation();
  const me = useStore((state) => state.me);
  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);

  const onPressNavigate = useCallback(() => navigation.navigate({ key: 'Post' }), []);

  return (
    <View>
      <Logo />
      <TouchableOpacity onPress={onPressNavigate}>
        <ButtonText>User</ButtonText>
      </TouchableOpacity>
      <TouchableOpacity onPress={me === null ? login : logout}>
        <ButtonText>{me === null ? 'Log In' : 'Log Out'}</ButtonText>
      </TouchableOpacity>
    </View>
  );
};

export default User;
