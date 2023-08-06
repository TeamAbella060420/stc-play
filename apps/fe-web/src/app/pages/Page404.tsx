import { RootState } from '@fe-monorepo/store';
import { useSelector } from 'react-redux';
import { translate } from '@fe-monorepo/helper';
import { useAppState } from '@fe-monorepo/hooks';
import { Button, Switch } from '@fe-monorepo/components';
import { getStyle } from '@fe-monorepo/themes';
import { useWindowDimensions } from 'react-native';

export function Page404() {
  const { language, themes } = useSelector((state: RootState) => state.app);
  const { changeLanguage, changeThemes } = useAppState();

  return (
    <div
      style={{
        height: useWindowDimensions().height,
        backgroundColor: getStyle(themes).backgroundColor
      }}
    >
      <h4 style={{ color: getStyle(themes).textColor }}> {translate('error_network_something_went_wrong')}</h4>
      <Button onPress={() => changeLanguage(language === 'en' ? 'ar' : 'en')} />
      <Switch isOn={themes === 'dark'} onToggle={() => changeThemes(themes === 'dark' ? 'light' : 'dark')} />
    </div>
  );
}

export default Page404;
