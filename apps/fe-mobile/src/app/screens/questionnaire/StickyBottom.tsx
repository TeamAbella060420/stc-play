import { View } from 'react-native';
import React, { useEffect } from 'react';
import styles from './styles';
import { getStyle } from '@fe-monorepo/themes';
import Button from '../../components/buttons';
import { translate } from '@fe-monorepo/helper';
import Link from '../../components/link';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { NAV_ROUTES } from '../../helpers/navRoutes';
import { setPersona, useAppDispatch } from '@fe-monorepo/store';
import { usePersonalizeQuestionnaire } from '@fe-monorepo/hooks';
import { QuestionnaireModel } from '@fe-monorepo/models';

type sharedProps = {
  selectedChoice: number;
  theme: string;
  isRTL: boolean;
  disabled?: boolean;
};

const StickyBottom = (props: sharedProps) => {
  const dispatch = useAppDispatch();
  const { submit, questionnaireData } = usePersonalizeQuestionnaire();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, NAV_ROUTES.Questionnaire>>();
  const { selectedChoice, theme, isRTL, disabled } = props;
  const flexDirection = isRTL ? 'row-reverse' : 'row';

  const gotoMain = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: NAV_ROUTES.Main }]
      })
    );
  };

  const handleNavigation = (type: string) => {
    dispatch(setPersona('new'));
    if (type === 'submit') {
      submit({ personal_questionnaire_code: selectedChoice } as QuestionnaireModel);
    } else {
      gotoMain();
    }
  };

  useEffect(() => {
    if (questionnaireData?.submitPersonalizationQuestionnaire.is_successful) {
      gotoMain();
    }
  }, [questionnaireData]);

  return (
    <View
      style={[
        styles.stickyBottomContainer,
        { flexDirection, borderColor: getStyle(theme).textColor20, backgroundColor: getStyle(theme).backgroundColor }
      ]}
    >
      <Link
        onPress={() => handleNavigation('skip')}
        type="primary"
        label={translate('action_skip')}
        labelStyle={styles.skip}
        withUnderLink={false}
      />
      <Button
        onPress={() => handleNavigation('submit')}
        style={{ height: 40 }}
        type="primary"
        disabled={disabled}
        label={translate('action_submit')}
      />
    </View>
  );
};

export default StickyBottom;
