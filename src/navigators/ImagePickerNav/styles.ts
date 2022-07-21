import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const CloseIcon = styled(Ionicons)`
  margin-left: 27px;
`;

export const MoreIcon = styled(Ionicons)`
  margin-left: 8px;
`;

export const HeaderTitleWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const HeaderTitleText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
