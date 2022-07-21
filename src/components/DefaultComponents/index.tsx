import equal from 'fast-deep-equal';
import React, { FC, memo, useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { Text } from './styles';

interface IProps {
  hello?: boolean;
}

const DefaultComponents: FC<IProps> = ({ hello }) => {
  const [test, setTest] = useState(false);
  const onTestPress = useCallback(() => setTest(!test), [test]);
  return (
    <>
      <TouchableOpacity onPress={onTestPress}>
        <Text>컴포넌트의 경우 state 존재{test && !hello ? '유무로' : ''}</Text>
      </TouchableOpacity>
    </>
  );
};

export default memo(DefaultComponents, equal);
