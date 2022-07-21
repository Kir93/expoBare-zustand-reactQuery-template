import styled from 'styled-components/native';

export const ColorBarWrapper = styled.View<{ color: string }>`
  width: 100vw;
  height: 2px;
  margin: 15px auto;
  background-color: ${(props) => props.color};
`;
