import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Image, TouchableOpacity } from 'react-native';

import Title from '@assets/title.webp';
import { View, ButtonText } from './Post.styles';

const Post = (): React.ReactElement => {
  const navigation = useNavigation();
  const onPressNavigate = useCallback(() => navigation.navigate({ key: 'User' }), []);
  return (
    <View>
      <Image source={Title} />
      <TouchableOpacity onPress={onPressNavigate}>
        <ButtonText>Post</ButtonText>
      </TouchableOpacity>
    </View>
  );
};

export default Post;
