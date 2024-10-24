import { useCallback, useMemo, useState } from 'react';

export const useToggleState = (): [
  boolean,
  () => void,
  () => void,
  () => void,
] => {
  const [isShown, setIsShown] = useState<boolean>(false);

  const setVisible = useCallback(() => {
    setIsShown(true);
  }, []);

  const setIsNotVisible = useCallback(() => {
    setIsShown(false);
  }, []);

  const toggle = useCallback(() => {
    setIsShown((value) => !value);
  }, []);
  return useMemo(
    () => [isShown, setVisible, setIsNotVisible, toggle],
    [isShown, setVisible, setIsNotVisible, toggle],
  );
};
