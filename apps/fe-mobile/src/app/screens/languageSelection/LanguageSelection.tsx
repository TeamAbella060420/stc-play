import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { translate } from '@fe-monorepo/helper';
import ViewContainer from '../../components/view_container';
import StandardHeader from '../../components/headers/standard_header';
import styles from './styles';
import { getStyle } from '@fe-monorepo/themes';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import Button from '../../components/buttons';
import RadioListItemButton from '../../components/radio_list_item_button';
import { LanguageSelections, LanguageSelectionsModel } from '@fe-monorepo/lang';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useAppState, useSettings } from '@fe-monorepo/hooks';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const LanguageSelection = () => {
  const navigation = useNavigation();
  const { themes, selectedLanguage, language } = useSelector((state: RootState) => state.app);
  const { persona } = useSelector((state: RootState) => state.user);
  const [selected, setSelected] = useState<LanguageSelectionsModel>({ code: language, lang: selectedLanguage });
  const { changeLanguage } = useAppState();
  const { updateAccountSettings, settingsData, settingsError } = useSettings();
  const { t } = useTranslation();

  useEffect(() => {
    if (settingsData?.updateSettings?.is_successful) {
      changeLanguage(selected.code, selected.lang);
      Toast.show({ text1: t('message_success_toast_language') });
    }
    if (settingsError || settingsData?.updateSettings?.error_msg) {
      Toast.show({ type: 'error', text1: t('message_error_toast_language') });
    }
  }, [settingsData, settingsError]);

  const onSave = () => {
    if (!persona || persona === 'guest') {
      changeLanguage(selected.code, selected.lang);
      Toast.show({ text1: t('message_success_toast_language') });
    } else {
      updateAccountSettings({ preferred_language: selected.code });
    }
  };

  const renderItem = ({ item, index }: { item: LanguageSelectionsModel; index: number }) => {
    const isSelected = item.code === selected.code;
    return (
      <RadioListItemButton
        key={`language_idx${index}`}
        isSelected={isSelected}
        onPress={() => setSelected({ code: item.code, lang: item.lang })}
        label={item.lang}
      />
    );
  };

  return (
    <ViewContainer style={styles.container}>
      <StandardHeader onBackPress={() => navigation.goBack()} label={translate('menu_changeLanguage')} />
      <FlatList
        style={styles.mb100}
        contentContainerStyle={styles.scrollContainer}
        data={LanguageSelections}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyExtractor={(_, index) => `language_idx${index}`}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={[styles.divider, { backgroundColor: getStyle(themes).textColor10 }]} />}
      />
      <Button style={styles.btnStyle} type="primary" label={translate('action_save')} onPress={onSave} />
    </ViewContainer>
  );
};

export default LanguageSelection;
