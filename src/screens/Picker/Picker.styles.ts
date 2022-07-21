import { WINDOW_WIDTH } from '@utils/windowSize';
import styled, { css } from 'styled-components/native';

export const SubmitButtonText = styled.Text<{ able?: boolean }>`
  font-size: 16px;
  font-weight: 500;
  margin-right: 27px;
  color: ${({ theme, able }) => (able ? theme.primary : theme.gray5)};
`;

export const PickerWrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const CameraButtonWrap = styled.TouchableOpacity`
  width: ${WINDOW_WIDTH / 3}px;
  height: ${WINDOW_WIDTH / 3}px;
  background-color: #bfbfbf;
  align-items: center;
  justify-content: center;
`;

export const PickerImage = styled.Image`
  width: ${WINDOW_WIDTH / 3}px;
  height: ${WINDOW_WIDTH / 3}px;
`;

export const ChooseWrap = styled.View<{ multiple: boolean; selected: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  border: 2px solid #fff;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  ${({ theme, selected }) =>
    selected &&
    css`
      border: 0;
      background-color: ${theme.primary};
    `}
`;

export const ChooseText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;

export const AlbumListWrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const AlbumItemRenderItemWrap = styled.TouchableOpacity`
  padding: 16px 27px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RenderItemTitle = styled.Text`
  margin-bottom: 7px;
  font-size: 18px;
  font-weight: 500;
  color: #000000;
`;
export const RenderItemCount = styled.Text`
  font-size: 14px;
  color: #808080;
`;
