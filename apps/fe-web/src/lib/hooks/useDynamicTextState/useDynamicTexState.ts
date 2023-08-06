import { useState } from 'react';
import { RootState } from '@fe-monorepo/store';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export const useDynamicTextState = () => {
  const pauseSpeed = 1000;
  const deleteSpeed = 1;
  const { t } = useTranslation();
  const prefs = useSelector((state: RootState) => state.app);
  const [isHighlighted, setIsHighlighted] = useState(false);

  const pauseCallback = () => setIsHighlighted(true);
  const deleteCallback = () => setIsHighlighted(false);

  return { pauseSpeed, deleteSpeed, t, prefs, isHighlighted, setIsHighlighted, pauseCallback, deleteCallback };
};
