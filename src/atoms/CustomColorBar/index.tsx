import React, { FC } from 'react';
import { ColorBarWrapper } from './styles';

export interface IProps {
  color: string;
}

const CustomColorBar: FC<IProps> = ({ color }) => <ColorBarWrapper color={color} />;

export default CustomColorBar;
