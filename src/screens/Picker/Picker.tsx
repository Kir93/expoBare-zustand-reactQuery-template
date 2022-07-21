import React, { useCallback, useEffect, useState } from 'react';

import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Alert, FlatList, TouchableOpacity } from 'react-native';

import { sendSetting } from '@utils/sendSetting';

import { AlbumsRouteProp, AlbumsStackNavParamList } from '@navigators/ImagePickerNav/PickerNav';

import Check from '@assets/picker/checkWh.svg';
import Camera from '@assets/picker/cameraWh.svg';

import {
  PickerWrapper,
  ChooseWrap,
  PickerImage,
  CameraButtonWrap,
  ChooseText,
  SubmitButtonText,
} from './Picker.styles';
import { StackNavigationProp } from '@react-navigation/stack';

interface IRenderItemProps {
  item: MediaLibrary.Asset;
}

const Picker = (): React.ReactElement => {
  const route = useRoute<AlbumsRouteProp>();
  const navigation = useNavigation<StackNavigationProp<AlbumsStackNavParamList>>();

  const { multiple, id: album } = route?.params;

  const [images, setImages] = useState([{ id: 'camera' }] as MediaLibrary.Asset[]);
  const [permission, setPermission] = useState(false);
  const [selectImage, setSelectImage] = useState([] as string[]);

  const getImages = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync({
      ...(album !== '최근 항목' && { album }),
    });
    setSelectImage([]);
    setImages([{ id: 'camera' }, ...photos] as MediaLibrary.Asset[]);
  };

  const onPressReject = () => navigation.navigate('MainTabNav');

  const getPermissions = async () => {
    const {
      accessPrivileges: accessType,
      status,
      canAskAgain,
    } = await MediaLibrary.getPermissionsAsync();
    if (status !== 'granted' && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== 'none') setPermission(true);
      else navigation.navigate('MainTabNav');
    } else if ((accessType !== 'all' && !canAskAgain) || (status !== 'granted' && !canAskAgain))
      sendSetting(onPressReject);
    else setPermission(true);
  };

  const onSendImage = (image: string | string[]) => {
    Alert.alert('send success!!');
    navigation.navigate('MainTabNav', { image });
  };

  const headerRight = () => {
    const able = selectImage.length > 0;
    const onPressImage = () => {
      onSendImage(selectImage);
    };
    return (
      <TouchableOpacity onPress={onPressImage} disabled={!able}>
        <SubmitButtonText able={able}>완료</SubmitButtonText>
      </TouchableOpacity>
    );
  };

  const onPictureCamera = () => {
    ImagePicker.launchCameraAsync({ allowsEditing: true }).then((v) => {
      const { uri } = v as { uri: string };
      onSendImage(uri);
    });
  };

  const onOpenCamera = useCallback(async () => {
    const { status, canAskAgain } = await ImagePicker.getCameraPermissionsAsync();
    if (status === 'undetermined' && canAskAgain) {
      const { status: roll } = await ImagePicker.requestCameraPermissionsAsync();
      if (roll === 'granted') onPictureCamera();
    } else if (status === 'undetermined' && !canAskAgain) sendSetting(onPressReject, true);
    else onPictureCamera();
  }, []);

  const onSelectPhoto = useCallback(
    (selected: boolean, uri: string) => () => {
      if (!multiple) setSelectImage((prev) => (prev[0] === uri ? [] : [uri]));
      else if (uri === 'max') Alert.alert('최대 갯수에 도달했습니다.');
      else setSelectImage((prev) => (selected ? prev.filter((v) => v !== uri) : prev.concat(uri)));
    },
    [selectImage],
  );

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    if (permission) getImages();
  }, [permission, album]);

  useEffect(() => {
    navigation.setOptions({ headerRight });
  }, [selectImage]);

  const renderItem = ({ item: { uri, id } }: IRenderItemProps) => {
    let number = -1;
    let selected;
    if (multiple) {
      number = selectImage?.findIndex((v) => v === uri) + 1;
      selected = number > 0;
    } else selected = uri === selectImage[0];
    return id === 'camera' ? (
      <CameraButtonWrap onPress={onOpenCamera}>
        <Camera width={48} height={48} />
      </CameraButtonWrap>
    ) : (
      <TouchableOpacity onPress={onSelectPhoto(selected, selectImage.length < 10 ? uri : 'max')}>
        <PickerImage source={{ uri }} />
        <ChooseWrap multiple={multiple ?? false} selected={selected}>
          {multiple ? <ChooseText>{number > 0 ? number : ''}</ChooseText> : selected && <Check />}
        </ChooseWrap>
      </TouchableOpacity>
    );
  };

  return (
    <PickerWrapper>
      <FlatList
        removeClippedSubviews
        numColumns={3}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </PickerWrapper>
  );
};

export default Picker;
