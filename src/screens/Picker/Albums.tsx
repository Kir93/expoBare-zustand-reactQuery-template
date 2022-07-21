import React, { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { View, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/core';

import CheckPr from '@assets/picker/checkPr.svg';

import { AlbumsRouteProp, AlbumsStackNavParamList } from '@navigators/ImagePickerNav/PickerNav';

import {
  AlbumItemRenderItemWrap,
  AlbumListWrapper,
  RenderItemCount,
  RenderItemTitle,
} from './Picker.styles';

interface IRenderItemProps {
  item: MediaLibrary.Album;
}

const Albums = (): React.ReactElement => {
  const navigation = useNavigation<StackNavigationProp<AlbumsStackNavParamList>>();
  const route = useRoute<AlbumsRouteProp>();
  const { album } = route?.params;

  const [albums, setAlbums] = useState([] as MediaLibrary.Album[]);

  const getAlbums = async () => {
    const { totalCount: assetCount } = await MediaLibrary.getAssetsAsync();
    const albumList = await MediaLibrary.getAlbumsAsync();
    setAlbums([
      { title: '최근 항목', assetCount, id: '최근 항목' } as MediaLibrary.Album,
      ...albumList,
    ]);
  };

  useEffect(() => {
    getAlbums();
  }, []);

  const onSelectAlbum = (selected: string, id: string) => () =>
    navigation.navigate('Picker', { album: selected, id });

  const renderItem = ({ item: { title, assetCount, id } }: IRenderItemProps) => (
    <AlbumItemRenderItemWrap onPress={onSelectAlbum(title, id)}>
      <View>
        <RenderItemTitle>{title}</RenderItemTitle>
        <RenderItemCount>{assetCount}</RenderItemCount>
      </View>
      {album === title && <CheckPr width={24} height={24} />}
    </AlbumItemRenderItemWrap>
  );

  return (
    <AlbumListWrapper>
      <FlatList data={albums} renderItem={renderItem} keyExtractor={(item) => item?.title} />
    </AlbumListWrapper>
  );
};

export default Albums;
