import * as Linking from 'expo-linking';
import { Alert } from 'react-native';

export const sendSetting = (onPressReject: () => void, camera = false): void =>
  Alert.alert(
    `사진 ${camera ? '촬영을' : '업로드를'} 위해서는 권한 설정이 필요합니다.`,
    '권한을 설정하러 가시겠습니까?',
    [
      {
        text: '아니요',
        onPress: onPressReject,
        style: 'cancel',
      },
      { text: '네', onPress: () => Linking.openSettings() },
    ],
  );
