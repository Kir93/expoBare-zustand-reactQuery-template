import { useCallback, useState } from 'react';

export default (initValue: boolean): [boolean, () => void] => {
  const [toggle, setToggle] = useState(initValue);
  const handler = useCallback(() => setToggle((prev) => !prev), [toggle]);
  return [toggle, handler];
};
